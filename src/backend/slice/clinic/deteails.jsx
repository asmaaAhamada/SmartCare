import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { ADMIN, BaseUrl, Clincs } from '../../Api';


// تعديل الـ Thunk ليستقبل المعرّف (id) ديناميكياً عند الاستدعاء
export const fetchDetailsclincs = createAsyncThunk(
  "program/fetchDetailsclincs",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START FOR ID:", id);
      const response = await getData(
        `${BaseUrl}${ADMIN}${Clincs}/${id}`,
      );
      console.log("API RESPONSE", response);
      return response; // الـ response يحتوي على البيانات المطلوبة
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchDetailsclincs',
  initialState: {
    isLoading: false,
    data: null, // تحويلها إلى null لتناسب الكائن (Object) القادم في الريسبونس
    error: null
  },
  reducers: {
    resetDetails: (state) => {
      state.data = null;
      state.error = null;
    }
  }, 
  extraReducers: builder => {
    builder
      .addCase(fetchDetailsclincs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDetailsclincs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data; // هنا يسند كائن الـ data الداخلي (id, name, created_at...)
      })
      .addCase(fetchDetailsclincs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { resetDetails } = counterSlice.actions;
export default counterSlice.reducer;