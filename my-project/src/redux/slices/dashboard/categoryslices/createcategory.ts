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



export const creatingcategoryfn = createAsyncThunk(
    '/product/new',
    async(data : any , {rejectWithValue}) => {
        try {
          
            const res = await axios.post(`${Url}/category/new` , data )
            return res.data
        } catch (error) {
            if(error instanceof axios.AxiosError){
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)



export const creatingcategoryslice= createSlice({
    name : 'creating category',
    reducers : {
        reset1categoryState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case 
        builder.addCase(creatingcategoryfn.pending , () => ({
            ...initialState,
            isLoading : true
        }))
        // FullFilled Case
        .addCase(creatingcategoryfn.fulfilled , (state , action) => ({
            ...initialState,
            isSuccess : true,
            data : action.payload
        }))
        // Rejected CAse 
        .addCase(creatingcategoryfn.rejected , (state , action) => ({
            ...initialState,
            isError : true,
            message : String(action.payload)
        }))
    },
})


export const { reset1categoryState } =  creatingcategoryslice.actions