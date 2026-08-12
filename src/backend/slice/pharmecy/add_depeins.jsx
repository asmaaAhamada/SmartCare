import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData } from "../../ApiServecies";
import { BaseUrl } from "../../Api";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const ADD_DEPEINSE = createAsyncThunk(
  "dispense/ADD_DEPEINSE",
  async ({ id, success, message }, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}staff/pharmacy/prescriptions/${id}/dispense`,
        { success, message },
        {},
        true
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "فشل عملية صرف الوصفة الطبية"
      );
    }
  }
);

const dispenseSlice = createSlice({
  name: "dispense",
  initialState,
  reducers: {
    resetAddMedicineState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ADD_DEPEINSE.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(ADD_DEPEINSE.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(ADD_DEPEINSE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddMedicineState } = dispenseSlice.actions;
export default dispenseSlice.reducer;