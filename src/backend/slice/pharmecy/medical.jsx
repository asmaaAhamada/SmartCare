import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { BaseUrl, DOCTORS } from '../../Api';

// الهيكل مطابق تماماً لطلب الـ Postman
const initialState = {
  formInfo: {
    appointment_id: '', 
    diagnosis: '',         
    symptoms: '',   
    notes: '', 
    vital_signs: {
      blood_pressure: '', 
      temperature: '',
      weight: '',
      height: ''
    }
  },
  Loading: false,
  error: null,
  success: false,
};

export const createMedicalRecord = createAsyncThunk(
  "medical/createRecord",
  async (recordData, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}doctor/medical-records`,
        recordData,
        {},
        true
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error.message ||
        "فشل إنشاء السجل الطبي"
      );
    }
  }
);

const medicalSlice = createSlice({
  name: 'medicalRecord',
  initialState,
  reducers: {
    setFormInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    setVitalSigns: (state, action) => {
      state.formInfo.vital_signs = { ...state.formInfo.vital_signs, ...action.payload };
    },
    resetForm: (state) => {
      state.formInfo = initialState.formInfo;
      state.success = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMedicalRecord.pending, (state) => {
        state.Loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createMedicalRecord.fulfilled, (state) => {
        state.Loading = false;
        state.success = true;
      })
      .addCase(createMedicalRecord.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setFormInfo, setVitalSigns, resetForm, clearError, clearSuccess } = medicalSlice.actions;
export default medicalSlice.reducer;