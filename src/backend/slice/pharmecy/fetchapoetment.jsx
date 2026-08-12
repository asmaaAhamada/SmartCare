import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { BaseUrl } from '../../Api';

export const FETCHAPPOETMENTS = createAsyncThunk(
  "program/FETCHAPPOETMENTS",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");
      const response = await getData(`${BaseUrl}staff/pharmacy/appointments`);
      console.log("API RESPONSE", response);
      // الباك إند يرجع المواعيد داخل response.data بناءً على الـ JSON المرسل
      return response?.data || response; 
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "فشل جلب المواعيد");
    }
  }
);

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(FETCHAPPOETMENTS.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(FETCHAPPOETMENTS.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // مصفوفة المواعيد
      })
      .addCase(FETCHAPPOETMENTS.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default appointmentsSlice.reducer;