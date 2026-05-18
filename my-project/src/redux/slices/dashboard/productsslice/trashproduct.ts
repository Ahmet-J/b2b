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

export const trashproductfn = createAsyncThunk(
    'trash/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<ProductResponse >(`${Url}/products/trash`);
            return res.data.data;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg);
            }
            return rejectWithValue(Errormesg);
        }
    }
);

export const trashproductslice = createSlice({
    name: "trash",
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder
            .addCase(trashproductfn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trashproductfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(trashproductfn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});
