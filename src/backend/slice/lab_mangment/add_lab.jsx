import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { ADMIN, BaseUrl, LAB, STAFF, TESTS } from '../../Api';

const initialState = {
  formInfo: {
    test_name: '',         
    doctor_id: [],   
    description: '', 
    notes: '',         
    patient_id: [], // التخصص عادة يكون معرف واحد من القائمة المنسدلة
  },
  isLoading: false,
  error: null,
  data: []
};

export const Addlab = createAsyncThunk(
  "program/Addlab",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}${STAFF}${LAB}${TESTS}`,
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
  name: 'Addlab',
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
      .addCase(Addlab.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Addlab.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(Addlab.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }
});

export const { updateFormField, resetForm } = counterSlice.actions;
export default counterSlice.reducer;