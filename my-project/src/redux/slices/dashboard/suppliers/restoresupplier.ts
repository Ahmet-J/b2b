



import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Url , Errormesg } from "../../../../interface";


const initialState = {
    isLoading : false,
    isSuccess : false,
    isError : false,
    message : '',
    data : {}
}


export const retoresupplierfn = createAsyncThunk(
    '/case/restore',
    async(id : any , { rejectWithValue}) => {
        try {
           const res = await axios.put(`${Url}/suppliers/restore/${id}`) 
           return res.data
        } catch (error) {
            if(error instanceof axios.AxiosError){
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)


export const retoresupplierslice =  createSlice({
    name : 'restoring product',
    reducers : {
       resetrestoresupplierState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending CAse
        builder.addCase(retoresupplierfn  .pending , () => ({
            ...initialState,
            isLoading : true
        }))
        // Fullfileed Case 
        .addCase(retoresupplierfn .fulfilled , (state , action) => ({
            ...initialState,
            isSuccess : true,
            data : action.payload
        }))
        // rejecetd case 
        .addCase(retoresupplierfn.rejected , (state , action) => ({
            ...initialState,
            isError : true,
            message : String(action.payload)
        }))
    },
})

export const { resetrestoresupplierState} =  retoresupplierslice.actions