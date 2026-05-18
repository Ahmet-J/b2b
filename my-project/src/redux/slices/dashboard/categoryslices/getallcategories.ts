import { Url , Errormesg } from "../../../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoryResponse {
    success: boolean;
    message: string;
    result: category[];  // ✅ Backend wuxuu isticmaalaa "result", ma aha "data"
}
interface categoryImage {
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
}

interface category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    images:  categoryImage[];
    createdAt: string;
    updatedAt: string;
    is_deleted: boolean;
}



interface CategoryState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: category[];
}

const initialState: CategoryState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: [] as category[]
};

export const getallcategoriesfn = createAsyncThunk(
    'category/all',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<CategoryResponse>(`${Url}/category/all`);
            return res.data.result;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg);
            }
            return rejectWithValue(Errormesg);
        }
    }
);

export const getallcategoriesSLice = createSlice({
    name: "getallcategorires",
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getallcategoriesfn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getallcategoriesfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getallcategoriesfn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});




