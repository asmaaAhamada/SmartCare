import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteData } from '../../ApiServecies';
import { ADMIN, ANNONCEMNTS, BaseUrl } from '../../Api';

export const deletAnnouncement = createAsyncThunk(
  'program/deletAnnouncement',
  async (id, { rejectWithValue }) => { // تمرير الـ id كبارامتر هنا بشكل صريح للثانك
    try {
      const response = await deleteData(
        `${BaseUrl}${ADMIN}${ANNONCEMNTS}/${id}`
      );
      console.log("رقم الاستجابة للحذف:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'deletAnnouncement',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(deletAnnouncement.pending, (state) => {
        state.isLoading = true;
        state.error = null; // إعادة تعيين الخطأ عند بدء طلب جديد
      })
      .addCase(deletAnnouncement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(deletAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;