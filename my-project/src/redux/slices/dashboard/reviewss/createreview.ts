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



export const creatingreviewfn = createAsyncThunk(
    '/order/new',
    async(data : any , {rejectWithValue}) => {
        try {
            // const token = JSON.parse(localStorage.getItem("userCredentails")!).token
            const res = await axios.post(`${Url}/reviews/new` , data )
            return res.data
        } catch (error) {
            if(error instanceof axios.AxiosError){
                return rejectWithValue(error.response?.data.message || Errormesg)
            }
            return rejectWithValue(Errormesg)
        }
    }
)



export const creatingreviewslice= createSlice({
    name : 'creating order',
    reducers : {
      resetcreatingreviewState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case 
        builder.addCase(creatingreviewfn .pending , () => ({
            ...initialState,
            isLoading : true
        }))
        // FullFilled Case
        .addCase(creatingreviewfn .fulfilled , (state , action) => ({
            ...initialState,
            isSuccess : true,
            data : action.payload
        }))
        // Rejected CAse 
        .addCase(creatingreviewfn .rejected , (state , action) => ({
            ...initialState,
            isError : true,
            message : String(action.payload)
        }))
    },
})


export const { resetcreatingreviewState } = creatingreviewslice.actions