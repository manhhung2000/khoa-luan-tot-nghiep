import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/axiosClient";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const result = await http.get("products/");
  return result;
});

export const getCategories = createAsyncThunk(
  "product/getCategories",
  async () => {
    const result = await http.get("categories/");
    return result;
  }
);

const initialState = {
  product: [],
  loading: false,
  category: [],
  listCate: [],
  listSearch: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setListCategories: (state, action) => {
      state.listCate = action.payload;
    },
    setListSearchs: (state, action) => {
      state.listSearch = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
    },

    [getCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { setListCategories, setListSearchs } = productSlice.actions;

export default productSlice.reducer;
