import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patchData } from '../../ApiServecies';
import { ADMIN, BaseUrl, DOCTORS, VERIFY } from '../../Api';

export const vrifyDoctors= createAsyncThunk(
  'program/vrifyDoctors',
  async (id, { rejectWithValue }) => { // تمرير الـ id كبارامتر هنا بشكل صريح للثانك
    try {
      const response = await patchData(
        `${BaseUrl}${ADMIN}${DOCTORS}/${id}${VERIFY}`
      );
      console.log("رقم الاستجابة للحذف:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'vrifyDoctors',
  initialState: {
    isLoading: false,
    data: [],success: false,
    error: null
  },
  reducers: {}, 
 extraReducers: (builder) => {
    builder
      .addCase(vrifyDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false; // 👈 تصفير عند البدء
      })
      .addCase(vrifyDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || [];
        state.success = true; // 👈 تحويلها لـ true عند النجاح
      })
      .addCase(vrifyDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        state.success = false;
      });
  }
});
export const { clearSuccess } = counterSlice.actions; // 👈 تصدير الأكشن الجديد
export default counterSlice.reducer;