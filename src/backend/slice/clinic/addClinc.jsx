import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { ADMIN, BaseUrl, Clincs } from '../../Api';

const initialState = {
  formInfo: {
    name: '',         
    room_number: '',   
    description: '', 
    phone: '',         
    is_active: true, // جعلناها true افتراضياً لتتوافق مع الـ Switch
    specialty_id: [], // التخصص عادة يكون معرف واحد من القائمة المنسدلة
    floor: '' // أضفت حقل الطابق لأنه موجود في الـ Modal
  },
  isLoading: false,
  error: null,
  data: []
};

export const AddClinic = createAsyncThunk(
  "program/AddClinic",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}${ADMIN}${Clincs}`,
        formData,
        {},
        true
      );
      return response;
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error
      );
    }
  }
);

export const counterSlice = createSlice({
  name: 'AddClinic',
  initialState,
  reducers: {
    // 🔑 الدالة السحرية لتحديث أي حقل ديناميكياً داخل الـ formInfo
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formInfo[field] = value;
    },
    // دالة لتنظيف النموذج بعد النجاح (حتى لا تظل البيانات القديمة مكتوبة عند فتح المودال مجدداً)
    resetForm: (state) => {
      state.formInfo = initialState.formInfo;
    }
  }, 
  extraReducers: builder => {
    builder
      .addCase(AddClinic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddClinic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(AddClinic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { updateFormField, resetForm } = counterSlice.actions;
export default counterSlice.reducer;