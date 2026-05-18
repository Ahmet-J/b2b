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



export const updatingcategoryfn = createAsyncThunk(
    '/product/new',
    async(data : any , {rejectWithValue}) => {
        try {
            const res = await axios.put(`${Url}/category/edit/${data.id}` , data )
            return res.data
        } catch (error) {
            if(error instanceof axios.AxiosError){
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)



export const updatingcategoryslice = createSlice({
    name : 'creating category',
    reducers : {
        resetcategoryState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case 
        builder.addCase(updatingcategoryfn.pending , () => ({
            ...initialState,
            isLoading : true
        }))
        // FullFilled Case
        .addCase(updatingcategoryfn.fulfilled , (state , action) => ({
            ...initialState,
            isSuccess : true,
            data : action.payload
        }))
        // Rejected CAse 
        .addCase(updatingcategoryfn.rejected , (state , action) => ({
            ...initialState,
            isError : true,
            message : String(action.payload)
        }))
    },
})


export const { resetcategoryState } =  updatingcategoryslice.actions