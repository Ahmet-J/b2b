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

export const updatinginquiryfn = createAsyncThunk(
    'inquiry/update',
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${Url}/inquiries/edit/${data.id}`, data)
            return res.data
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                return rejectWithValue(error.response?.data?.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)

export const updatinginquiryslice = createSlice({
    name: 'updatinginquiry',
    reducers: {
        resetinquiryState: () => initialState
    },
    initialState,
    extraReducers(builder) {
        builder
            .addCase(updatinginquiryfn.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.message = ''
            })
            .addCase(updatinginquiryfn.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.data = action.payload
                state.message = 'Updated successfully'
            })
            .addCase(updatinginquiryfn.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
    },
})

export const { resetinquiryState } = updatinginquiryslice.actions
export default updatinginquiryslice.reducer