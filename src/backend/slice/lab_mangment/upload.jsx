import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { BaseUrl, LAB, STAFF, TESTS, UPLOAD } from '../../Api';

// Thunk لرفع نتيجة التحليل متوافق مع بوست مان (يستقبل الـ id والـ formData)
export const ExportFile = createAsyncThunk(
  "program/ExportFile",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      console.log("API CALL START - Uploading for ID:", id);

      const response = await postData(
        `${BaseUrl}${STAFF}${LAB}${TESTS}/${id}${UPLOAD}`,
        formData // إرسال الـ FormData المحتوية على الملف والملاحظات
      );

      console.log("API RESPONSE", response);
      return response;
    } catch (error) {
      console.log("API ERROR", error);
      // إرجاع رسالة الخطأ القادمة من السيرفر أو الرسالة العامة
      return rejectWithValue(error?.response?.data?.message || error?.message || "فشلت عملية الرفع");
    }
  }
);

export const counterSlice = createSlice({
  name: 'ExportFile',
  initialState: {
    isLoading: false,
    success: false, // لمتابعة حالة النجاح بالـ component
    data: null,
    error: null
  },
  reducers: {
    // رديوسر لتصفير الحالة عند الحاجة (مثلاً عند إغلاق المودال أو التنبيه)
    resetUploadState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(ExportFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(ExportFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(ExportFile.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload; 
      });
  }
});

export const { resetUploadState } = counterSlice.actions;
export default counterSlice.reducer;