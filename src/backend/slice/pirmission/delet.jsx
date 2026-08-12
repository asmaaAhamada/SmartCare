import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteData } from '../../ApiServecies';
import { ADMIN, BaseUrl, Roles } from '../../Api';

export const deletRoles= createAsyncThunk(
  'program/deletRoles',
  async (id, { rejectWithValue }) => { // تمرير الـ id كبارامتر هنا بشكل صريح للثانك
    try {
      const response = await deleteData(
        `${BaseUrl}${ADMIN}${Roles}/${id}`
      );
      console.log("رقم الاستجابة للحذف:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'deletRoles',
  initialState: {
    isLoading: false,
    data: [],
    error: null
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(deletRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null; // إعادة تعيين الخطأ عند بدء طلب جديد
      })
      .addCase(deletRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || [];
      })
      .addCase(deletRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export default counterSlice.reducer;