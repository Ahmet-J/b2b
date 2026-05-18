



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


export const retoreproductfn = createAsyncThunk(
    '/case/restore',
    async(id : any , { rejectWithValue}) => {
        try {
           const res = await axios.put(`${Url}/products/restore/${id}`) 
           return res.data
        } catch (error) {
            if(error instanceof axios.AxiosError){
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)


export const retoreproductSLice =  createSlice({
    name : 'restoring product',
    reducers : {
        resetrestorecasesState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending CAse
        builder.addCase(retoreproductfn  .pending , () => ({
            ...initialState,
            isLoading : true
        }))
        // Fullfileed Case 
        .addCase(retoreproductfn .fulfilled , (state , action) => ({
            ...initialState,
            isSuccess : true,
            data : action.payload
        }))
        // rejecetd case 
        .addCase(retoreproductfn .rejected , (state , action) => ({
            ...initialState,
            isError : true,
            message : String(action.payload)
        }))
    },
})

export const { resetrestorecasesState} =  retoreproductSLice.actions