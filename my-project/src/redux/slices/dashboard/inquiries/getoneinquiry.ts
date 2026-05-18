
import { Url , Errormesg } from "../../../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface inquiryresponce {
    success: boolean;
    message: string;
    result: inquiry[];  // ✅ Backend wuxuu isticmaalaa "result", ma aha "data"
}


interface inquiry {
    id: number;
    productId: number;
    subject: string;
    message: string;
    quantity: number;
    status: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
}




const initialState = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
    data: [] as inquiry[]
}


export const getoneinquiryfn = createAsyncThunk(
    'order/all',
    async (id:any, { rejectWithValue }) => {
        try {
            const res = await axios.get<inquiryresponce>(`${Url}/inquiries/one/${id}`);
            return res.data.result;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)

export const getoneinquiryslice = createSlice({
    name: "getallinquiry",
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getoneinquiryfn .pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getoneinquiryfn .fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getoneinquiryfn .rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});