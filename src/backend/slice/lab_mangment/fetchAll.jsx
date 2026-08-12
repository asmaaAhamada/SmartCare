import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseUrl, LAB, STAFF, TESTS } from '../../Api';
import { getData } from '../../ApiServecies';


export const fetchlab = createAsyncThunk(
  "program/fetchlab",
  async (filters, { rejectWithValue }) => {
    try {
      console.log("API CALL START WITH FILTERS:", filters);

      let url = `${BaseUrl}${STAFF}${LAB}${TESTS}`;
      const params = new URLSearchParams();

      // بناء روابط الفلترة ديناميكياً بناءً على معطيات البوست مان
      if (filters?.test_type && filters.test_type !== "all" && filters.test_type !== "") {
        params.append("test_type", filters.test_type);
      }
      if (filters?.status && filters.status !== "all" && filters.status !== "") {
        params.append("status", filters.status);
      }
      if (filters?.date) {
        params.append("date", filters.date);
      }
      if (filters?.search) {
        params.append("search", filters.search);
      }
      if (filters?.patient_id) {
        params.append("patient_id", filters.patient_id);
      }

      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      // استبدل getData بالطريقة المستخدمة في مشروعك للإرسال
      const response = await getData(url); 
      console.log("API RESPONSE", response);
      return response; // الـ API يعيد كائن يحتوي على { success: true, data: { data: [...] } }
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ أثناء جلب التحاليل");
    }
  }
);

export const labSlice = createSlice({
  name: 'fetchlab',
  initialState: {
    isLoading: false,
    data: [],
    meta: null,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchlab.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchlab.fulfilled, (state, action) => {
        state.isLoading = false;
        // حسب رد الـ API في الصور: البيانات داخل action.payload.data.data
        state.data = action.payload?.data?.data || [];
        state.meta = action.payload?.data || null; // للاحتفاظ بمعلومات الـ pagination إن وجدت
      })
      .addCase(fetchlab.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default labSlice.reducer;