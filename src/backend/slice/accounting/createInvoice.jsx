import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl, STAFF } from "../../Api";
import { postData } from "../../ApiServecies";

export const createInvoice = createAsyncThunk(
  "accounting/createInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}${STAFF}/accounting/invoices`,
        invoiceData
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

const createInvoiceSlice = createSlice({
  name: "createInvoice",
  initialState: {
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetCreateInvoice(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.isLoading = true;
        state.success = false;
      })
      .addCase(createInvoice.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.isLoading =false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateInvoice } = createInvoiceSlice.actions;

export default createInvoiceSlice.reducer;