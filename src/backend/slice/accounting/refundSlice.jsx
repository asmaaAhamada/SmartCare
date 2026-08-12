import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl, STAFF } from "../../Api";
import { postData } from "../../ApiServecies";

export const refundPayment = createAsyncThunk(
  "accounting/refundPayment",
  async ({ paymentId, data }, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}${STAFF}/accounting/payments/${paymentId}/refund`,
        data
      );
console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        "حدث خطأ أثناء تنفيذ عملية الاسترداد"
      );
    }
  }
);

const refundSlice = createSlice({
  name: "refundPayment",

  initialState: {
    isLoading: false,
    success: false,
    message: "",
    error: null,
  },

  reducers: {
    resetRefundState: (state) => {
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(refundPayment.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(refundPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message =
          action.payload?.message ||
          "تم تنفيذ عملية الاسترداد بنجاح";
      })

      .addCase(refundPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRefundState } = refundSlice.actions;

export default refundSlice.reducer;