import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const partialRefund = createAsyncThunk(
  "payments/partialRefund",
  async ({ paymentId, refund_amount, refund_reason }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/admin/payments/${paymentId}/refund`,
        {
          refund_amount,
          refund_reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "حدث خطأ أثناء تنفيذ عملية الاسترجاع",
        }
      );
    }
  }
);

const partialRefundSlice = createSlice({
  name: "partialRefund",

  initialState: {
    loading: false,
    success: false,
    data: null,
    error: null,
  },

  reducers: {
    resetRefundState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(partialRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(partialRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })

      .addCase(partialRefund.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetRefundState } = partialRefundSlice.actions;

export default partialRefundSlice.reducer;