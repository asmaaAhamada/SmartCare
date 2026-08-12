import { createSlice } from "@reduxjs/toolkit";
import { Log_in } from "./log_in_Slice";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
    setUserInfo: (state, action) => {
      // 🌟 هنا نستقبل البيانات من ProtectedRoute (تأتي مباشرة كـ Object الحساب)
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(Log_in.fulfilled, (state, action) => {
      // هنا نستقبل البيانات عند نجاح تسجيل الدخول لأول مرة
      const apiData = action.payload?.data;
      if (apiData) {
        state.userInfo = apiData.admin || apiData.staff || null;
      }
    });
  },
});

export const { logout, setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;