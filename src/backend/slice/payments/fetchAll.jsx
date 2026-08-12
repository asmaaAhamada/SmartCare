import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN, BaseUrl, PAYMENT } from '../../Api';
import { getData } from '../../ApiServecies';

export const fetchPAYMENT = createAsyncThunk(
  "program/fetchPAYMENT",
  async (filters, { rejectWithValue }) => {
    try {
      console.log("API CALL START WITH FILTERS:", filters);

      // بناء روابط الفلترة ديناميكياً بناءً على معطيات البوست مان
      let url = `${BaseUrl}${ADMIN}${PAYMENT}`;
      const params = new URLSearchParams();

      if (filters?.payment_method && filters.payment_method !== "all") {
        params.append("payment_method", filters.payment_method);
      }
      if (filters?.patient_id) {
        params.append("patient_id", filters.patient_id);
      }
      if (filters?.status && filters.status !== "all") {
        params.append("status", filters.status);
      }

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await getData(url);
      console.log("API RESPONSE", response);
      return response;
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ أثناء جلب المدفوعات");
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchPAYMENT',
  initialState: {
    isLoading: false,
    data: [],
    meta: null,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPAYMENT.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPAYMENT.fulfilled, (state, action) => {
        state.isLoading = false;
        // معالجة بنية رد الـ API (حيث البيانات موجودة داخل action.payload.data)
        state.data = action.payload?.data || [];
        state.meta = action.payload?.meta || null;
      })
      .addCase(fetchPAYMENT.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default counterSlice.reducer;