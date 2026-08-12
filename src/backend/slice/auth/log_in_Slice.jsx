import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { postData } from '../../ApiServecies';
import { BaseUrl } from '../../Api'; // تأكد من استيراد BaseUrl

const initialState = {
  formInfo: {
    token: null,
    password: '',
    email: '',
    loginType: 'admin' // 🌟 أضفنا نوع تسجيل الدخول هنا (admin أو staff)
  },
  isLoading: false,
  error: {
    email: '',
    password: '',
    general: ''
  },
};

export const Log_in = createAsyncThunk(
  'Log_in/Log_in',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { password, email, loginType } = state.Log_in.formInfo;

      // 🌟 تحديد المسار بناءً على النوع المختار من القائمة المنسدلة
      const endpoint = loginType === 'admin' ? 'admin/login' : 'staff/login';
      const url = `${BaseUrl}${endpoint}`;
console.log(url)
      const response = await postData(url, { password, email });

   if (response?.data?.token) {
        // 1. تخزين التوكن
        cookies.set('token', response.data.token, { path: '/' });
        
        // 🌟 2. تخزين نوع تسجيل الدخول في الكوكيز للرجوع إليه عند الـ Refresh
        cookies.set('loginType', loginType, { path: '/' });
      }

      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.message || 'Login failed');
    }
  }
);

const formSlice = createSlice({
  name: 'Log_in',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    setError: (state, action) => {
      state.error = { ...state.error, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
      state.error = { email: '', password: '', general: '' };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Log_in.pending, (state) => {
        state.isLoading = true;
        state.error = { email: '', password: '', general: '' };
      })
      .addCase(Log_in.fulfilled, (state) => {
        state.isLoading = false;
        // تم نقل تخزين الـ user إلى الـ userSlice بنجاح
      })
      .addCase(Log_in.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          email: '',
          password: '',
          general: action.payload || 'Login failed'
        };
      });
  },
});

export const { setformInfo, resetForm, clearError, setError } = formSlice.actions;
export default formSlice.reducer;