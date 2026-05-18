import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Url , Errormesg } from "../../../../interface";


const initialState  = {
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : '',
    data : {}
}



export const creatinginquiryfn = createAsyncThunk(
    '/product/new',
    async(data : any , {rejectWithValue}) => {
        try {
          
            const res = await axios.post(`${Url}/inquiries/new` , data )
            return res.data
        } catch (error) {
            if(error instanceof axios.AxiosError){
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)



export const creatinginquiryslice= createSlice({
    name : 'creating category',
    reducers : {
        resetinquiryState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case 
        builder.addCase(creatinginquiryfn.pending , () => ({
            ...initialState,
            isLoading : true
        }))
        // FullFilled Case
        .addCase(creatinginquiryfn.fulfilled , (state , action) => ({
            ...initialState,
            isSuccess : true,
            data : action.payload
        }))
        // Rejected CAse 
        .addCase(creatinginquiryfn.rejected , (state , action) => ({
            ...initialState,
            isError : true,
            message : String(action.payload)
        }))
    },
})


export const { resetinquiryState } =  creatinginquiryslice.actions