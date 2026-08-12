import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patchData } from '../../ApiServecies'; // تأكد من استيراد دالة الباتش الخاصة بمشروعك
import { BaseUrl, STAFF, LAB, TESTS, STATUS } from '../../Api';

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  data: null
};

export const Editestatus = createAsyncThunk(
  "program/Editestatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // إرسال الستاتوس بالبودي (Payload) عبر ميثود PATCH حسب متطلبات الباك إند
      const response = await patchData(
        `${BaseUrl}${STAFF}${LAB}${TESTS}/${id}${STATUS}`,
        { status }, // البودي الممرر
        {},
        true
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "حدث خطأ أثناء تحديث الحالة"
      );
    }
  }
);

export const editStatusSlice = createSlice({
  name: 'Editestatus',
  initialState,
  reducers: {
    resetStatusState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Editestatus.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(Editestatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(Editestatus.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { resetStatusState } = editStatusSlice.actions;
export default editStatusSlice.reducer;