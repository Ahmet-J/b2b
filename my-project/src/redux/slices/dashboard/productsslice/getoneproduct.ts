import { Url , Errormesg } from "../../../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { JSX } from "react/jsx-runtime";



interface oneproductresponce {
    succes: boolean,
    data: products 
}

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    data: {} as products
};


interface  products{
  id: number
  supplierId: number
  categoryId?: number 
  name: string
  slug: string
  sku?: string
  description?: string 
  specifications?: string
  price: number
  currency: string
  minOrderQty: number
  stock: number
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  is_deleted: boolean

  images: ProductImage 



}
interface ProductImage {
  map(arg0: (image: any, idx: any) => JSX.Element): import("react").ReactNode;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export const oneproductfn = createAsyncThunk(
  "//one/:id",
  async (id: any, { rejectWithValue }) => {
    try {
      const res = await axios.get<oneproductresponce>(`${Url}/products/one/${id}`);
      return res.data.data
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        return rejectWithValue(error.response?.data.message || Errormesg);
      }
      return rejectWithValue(Errormesg);
    }
  },
);

export const oneproducttSlice = createSlice({
  name: "one student",
  reducers: {},
  initialState,
  extraReducers(builder) {
    // Pending Case
    builder
      .addCase(oneproductfn.pending, () => ({
        ...initialState,
        isLoading: true,
      }))
      .addCase(oneproductfn.fulfilled, (_, action) => ({
        ...initialState,
        isSuccess: true,
        data: action.payload,
      }))
      .addCase(oneproductfn.rejected, (_, action) => ({
        ...initialState,
        isError: true,
        message: String(action.payload),
      }));
  },
});