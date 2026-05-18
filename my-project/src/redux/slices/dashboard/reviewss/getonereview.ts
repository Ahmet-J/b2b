

import { Url , Errormesg } from "../../../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface reviewResponse {
    success: boolean;
    message: string;
    result: review[];  
}


interface review {
    id: number;
    orderNumber: string;
    supplierId: number;
    status: string;
    totalAmount: number;
    currency: string;
    notes: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string
}



interface reviewState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: review[];
}

const initialState = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    data: [] as review[]
}

export const getonereviewfn = createAsyncThunk(
    'order/all',
    async (id:any, { rejectWithValue }) => {
        try {
            const res = await axios.get< reviewResponse>(`${Url}/reviews/one/${id}`);
            return res.data.result;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)

export const getonereviewslice = createSlice({
    name: "getallinquiry",
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getonereviewfn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getonereviewfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getonereviewfn .rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});