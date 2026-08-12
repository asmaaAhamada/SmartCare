import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCOUNTANT, BaseUrl, PAYMENT, STAFF } from '../../Api';
import { getData } from '../../ApiServecies';

export const payments_stats = createAsyncThunk(
  "program/payments_stats",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");
      const response = await getData(
        `${BaseUrl}${STAFF}/accounting/payments/stats`
      );
      return response; // الرد الكامل يحتوي على { success, data, meta }
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما أثناء جلب البيانات");
    }
  }
);

export const counterSlice = createSlice({
  name: 'payments_stats',
  initialState: {
    Loading: false,
    data: [], // سنخزن مصفوفة الداتا النظيفة هنا
    meta: null,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(payments_stats.pending, (state) => {
        state.Loading = true;
        state.error = null;
      })
      .addCase(payments_stats.fulfilled, (state, action) => {
        state.Loading = false;
        // المطابقة مع الهيكل: الـ API يعيد الحقول بداخل كائن يحتوي على داتا
        state.data = action.payload?.data || []; 
        state.meta = action.payload?.meta || null;
      })
      .addCase(payments_stats.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload;
      });
  }
});

export default counterSlice.reducer;