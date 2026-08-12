import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteData } from '../../ApiServecies';
import { ADMIN, BaseUrl, DOCTORS } from '../../Api';

export const deletDoctors= createAsyncThunk(
  'program/deletDoctors',
  async (id, { rejectWithValue }) => { // تمرير الـ id كبارامتر هنا بشكل صريح للثانك
    try {
      const response = await deleteData(
        `${BaseUrl}${ADMIN}${DOCTORS}/${id}`
      );
      console.log("رقم الاستجابة للحذف:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'deletDoctors',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(deletDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null; // إعادة تعيين الخطأ عند بدء طلب جديد
      })
      .addCase(deletDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(deletDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;