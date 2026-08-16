import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { BaseUrl } from '../../Api';
import { postData } from '../../ApiServecies';

const cookies = new Cookies();

const initialState = {
  isLoading: false,
  error: null,
};

export const Logout = createAsyncThunk(
  'Logout/execute',
  async (_, { rejectWithValue }) => {
    try {
      // 1. قراءة نوع المستخدم المخزن سابقاً عند تسجيل الدخول من الـ Cookies
      const loginType = cookies.get('loginType');
      
      // 2. تحديد Endpoint بناءً على النوع (إما admin أو staff)
      const endpoint = loginType === 'admin' ? 'admin/logout' : 'staff/logout';
      const url = `${BaseUrl}/${endpoint}`;

      // 3. إرسال طلب تسجيل الخروج
      const response = await postData(url, {}, true);

      // 4. مسح الـ Cookies المجهزة بعد نجاح العملية
      cookies.remove('token', { path: '/' });
      cookies.remove('loginType', { path: '/' });

      return response;
    } catch (error) {
      // حتى في حال حدوث خطأ بالسيرفر، قم بمسح الـ Cookies لتسجيل خروج المستخدم محلياً
      cookies.remove('token', { path: '/' });
      cookies.remove('loginType', { path: '/' });
      return rejectWithValue(error?.response?.data?.message || error?.message || 'فشل تسجيل الخروج');
    }
  }
);

const logoutSlice = createSlice({
  name: 'Logout',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = logoutSlice.actions;
export default logoutSlice.reducer;