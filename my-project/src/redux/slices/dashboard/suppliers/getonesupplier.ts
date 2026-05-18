
import { Url , Errormesg } from "../../../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface supplier {
            id: number;
            userId: number;
            companyName: string;
            description: string;
            businessLicense: string;
            country: string;
            city: string;
            address: string;
            yearEstablished: number;
            employeeCount: number;
            verifiedStatus: string;
            createdAt: string;
            updatedAt: string;
            is_deleted: boolean;
}

interface supplierResponse {
    success: boolean;
    result: supplier;
}



const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: [] as supplier []
};

export const getonesupplierfn = createAsyncThunk(
    'suppliers/getone',
    async (id:any, { rejectWithValue }) => {
        try {
            const res = await axios.get<supplierResponse>(`${Url}/suppliers/one/${id}`);
            return res.data.result;
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg);
            }
            return rejectWithValue(Errormesg);
        }
    }
);

export const getonelsupplierslice = createSlice({
    name: "getonesuppliers",
    reducers: {},
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getonesupplierfn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getonesupplierfn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getonesupplierfn.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = String(action.payload);
            });
    },
});

