import { Url , Errormesg } from "../../../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface orderResponse {
    success: boolean;
    message: string;
data: order[];  // ✅ Backend wuxuu isticmaalaa "result", ma aha "data"
}
interface orderitem {
    notes: string;
    quantity: number;
    productId: number;
    unitPrice: number;
    totalPrice: number;
}

interface order {
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



interface orderState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data: order[];
}

const initialState = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    data: [] as order[]
}



export const trashorderfn = createAsyncThunk(
    'trash/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get<orderResponse >(`${Url}/orders/trash`);
            return res.data.data;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg);
            }
            return rejectWithValue(Errormesg);
        }
    }
);

export const trashorderslice = createSlice({
    name: "trash",
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder
            .addCase(trashorderfn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(trashorderfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(trashorderfn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});