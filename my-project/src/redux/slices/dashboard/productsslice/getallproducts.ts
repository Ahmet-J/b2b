import { Url , Errormesg } from "../../../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductImage {
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
}

interface Product {
    id: number;
    supplierId: number;
    categoryId?: number;
    name: string;
    slug: string;
    sku?: string;
    description?: string;
    specifications?: string;
    price: number;
    currency: string;
    minOrderQty: number;
    stock: number;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    is_deleted: boolean;
    images: ProductImage[];
}

interface ProductResponse {
    success: boolean;
    data: Product[];
}

interface ProductState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: Product[];
}

const initialState: ProductState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: [] as Product[]
};

export const getallproductfn = createAsyncThunk(
    'product/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<ProductResponse>(`${Url}/products/all`);
            return res.data.data;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg);
            }
            return rejectWithValue(Errormesg);
        }
    }
);

export const getallproductSLice = createSlice({
    name: "getallproduct",
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getallproductfn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getallproductfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getallproductfn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});

export default getallproductSLice.reducer;