import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putData } from "../../ApiServecies";
import { ADMIN, BaseUrl, MEDICATION, PHARMECY, STAFF } from "../../Api";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const Update_medications = createAsyncThunk(
  "medicationss/Update_medications",
  async ({ id, name , price }, { rejectWithValue }) => {
    try {
      const response = await putData(
        `${BaseUrl}${STAFF}${PHARMECY}${MEDICATION}/${id}`,
        {name , price },
        {},
        true
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "فشل تعديل الدور"
      );
    }
  }
);

const updatemedicationsSlice = createSlice({
  name: "Update_medications",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(Update_medications.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(Update_medications.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(Update_medications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updatemedicationsSlice.reducer;