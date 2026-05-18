import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Url , Errormesg } from "../../../../interface";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    data: {}
}

export const removesupplierfn = createAsyncThunk(
    'supplier/remove',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${Url}/suppliers/remove/${id}`); 
            
            return res.data;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg);
            }
            return rejectWithValue(Errormesg);
        }
    }
);

export const removesupplierslice = createSlice({
    name: 'removesupplier',
    reducers: {
        resetremoveproductState: () => initialState
    },
    initialState,
    extraReducers(builder) {
        builder
            .addCase(removesupplierfn.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(removesupplierfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.data = action.payload;
            })
            .addCase(removesupplierfn.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});

export const { resetremoveproductState } =  removesupplierslice.actions;
