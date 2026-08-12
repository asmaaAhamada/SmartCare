import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { patchData } from '../../ApiServecies';
import { ADMIN, BaseUrl, Clincs, TOGGIL, VERIFY } from '../../Api';

export const vrifyClinic= createAsyncThunk(
  'program/vrifyClinic',
  async (id, { rejectWithValue }) => { // تمرير الـ id كبارامتر هنا بشكل صريح للثانك
    try {
      const response = await patchData(
        `${BaseUrl}${ADMIN}${Clincs}/${id}${TOGGIL}`
      );
      console.log("رقم الاستجابة للحذف:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'vrifyClinic',
  initialState: {
    isLoading: false,
    data: [],success: false,
    error: null
  },
 reducers: {
    clearSuccess: (state) => {
        state.success = false;
        state.error = null;
    }
}, 
 extraReducers: (builder) => {
    builder
      .addCase(vrifyClinic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false; // 👈 تصفير عند البدء
      })
      .addCase(vrifyClinic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data || [];
        state.success = true; // 👈 تحويلها لـ true عند النجاح
      })
      .addCase(vrifyClinic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        state.success = false;
      });
  }
});
export const { clearSuccess } = counterSlice.actions; // 👈 تصدير الأكشن الجديد
export default counterSlice.reducer;