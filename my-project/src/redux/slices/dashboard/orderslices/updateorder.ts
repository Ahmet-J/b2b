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



export const updatingorderfn = createAsyncThunk(
    '/product/new',
    async(data : any , {rejectWithValue}) => {
        try {
            const res = await axios.put(`${Url}/orders/edit/${data.id}` , data )
            return res.data
        } catch (error) {
            if(error instanceof axios.AxiosError){
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)



export const updatingorderslice = createSlice({
    name : 'creating order',
    reducers : {
       resetupdatingorderState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case 
        builder.addCase(updatingorderfn.pending , () => ({
            ...initialState,
            isLoading : true
        }))
        // FullFilled Case
        .addCase(updatingorderfn.fulfilled , (state , action) => ({
            ...initialState,
            isSuccess : true,
            data : action.payload
        }))
        // Rejected CAse 
        .addCase(updatingorderfn.rejected , (state , action) => ({
            ...initialState,
            isError : true,
            message : String(action.payload)
        }))
    },
})


export const { resetupdatingorderState } =  updatingorderslice.actions