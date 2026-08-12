import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ADMIN, APPINTMENT, BaseUrl, PATIENTS } from '../../../Api';
import { getData } from '../../../ApiServecies';

export const fetchspesficAPPINTMENT= createAsyncThunk(
  "program/fetchspesficAPPINTMENT",
  async (id, { rejectWithValue }) => { // 👈 تم تمرير الـ id هنا كبارامتر صريح
    try {
      console.log("API CALL START FOR APPOINTMENT ID:", id);

      const response = await getData(
        `${BaseUrl}${ADMIN}${APPINTMENT}/${id}` // 👈 جلب تفاصيل موعد محدد بناءً على البوست مان المرفق
      );

      console.log("API RESPONSE", response);
      return response;
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message || "حدث خطأ أثناء جلب التفاصيل");
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchspesficAPPINTMENT',
    initialState: {
       isLoading: false,
       data: null, // 👈 تحويلها لكائن null ليناسب تفاصيل عنصر واحد
       error: null
    },
    reducers: {
       resetSpecificDetails: (state) => { // 👈 أكشن لتصفير البيانات عند إغلاق المودال
         state.data = null;
         state.error = null;
       }
    }, 
    extraReducers: builder => {
        builder
          .addCase(fetchspesficAPPINTMENT.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchspesficAPPINTMENT.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload?.data || action.payload; // إسناد البيانات المرجعة
          })
          .addCase(fetchspesficAPPINTMENT.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          });
    }
});
  
export const { resetSpecificDetails } = counterSlice.actions;
export default counterSlice.reducer;