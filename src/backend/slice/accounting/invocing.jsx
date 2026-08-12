import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ACCOUNTANT, BaseUrl, STAFF } from '../../Api';
import { getData } from '../../ApiServecies';

export const fetchinnvocing = createAsyncThunk(
  "program/fetchinnvocing",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");
      const response = await getData(
        `${BaseUrl}${STAFF}/accounting/invoices`
      );
      return response; // الرد الكامل يحتوي على { success, data, meta }
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ ما أثناء جلب البيانات");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchinnvocing',
  initialState: {
    isLoading: false,
    data: [], // سنخزن مصفوفة الداتا النظيفة هنا
    meta: null,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchinnvocing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchinnvocing.fulfilled, (state, action) => {
        state.isLoading = false;
        // المطابقة مع الهيكل: الـ API يعيد الحقول بداخل كائن يحتوي على داتا
        state.data = action.payload?.data || []; 
        state.meta = action.payload?.meta || null;
      })
      .addCase(fetchinnvocing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default counterSlice.reducer;