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

export const removeinquiryfn = createAsyncThunk(
    'category/remove',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${Url}/inquiries/remove/${id}`);
            
            return res.data;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg);
            }
            return rejectWithValue(Errormesg);
        }
    }
);

export const removeinquiryslice= createSlice({
    name: 'removeproduct',
    reducers: {
        resetremoveinquiryState: () => initialState
    },
    initialState,
    extraReducers(builder) {
        builder
            .addCase(removeinquiryfn.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
            })
            .addCase(removeinquiryfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.data = action.payload;
            })
            .addCase(removeinquiryfn.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});

export const { resetremoveinquiryState } = removeinquiryslice.actions;
