import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCOUNTANT, BaseUrl, PAYMENT, STAFF } from '../../Api';
import { getData } from '../../ApiServecies';

export const fetchpayments = createAsyncThunk(
  "program/fetchpayments",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");
      const response = await getData(
        `${BaseUrl}${STAFF}${ACCOUNTANT}${PAYMENT}`
      );
      return response; // الرد الكامل يحتوي على { success, data, meta }
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما أثناء جلب البيانات");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchpayments',
  initialState: {
    isLoading: false,
    data: [], // سنخزن مصفوفة الداتا النظيفة هنا
    meta: null,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchpayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchpayments.fulfilled, (state, action) => {
        state.isLoading = false;
        // المطابقة مع الهيكل: الـ API يعيد الحقول بداخل كائن يحتوي على داتا
        state.data = action.payload?.data || []; 
        state.meta = action.payload?.meta || null;
      })
      .addCase(fetchpayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default counterSlice.reducer;