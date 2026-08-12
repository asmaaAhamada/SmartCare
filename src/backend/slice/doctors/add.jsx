import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { ADMIN, BaseUrl, DOCTORS } from '../../Api';


const initialState = {
  formInfo: {
    first_name: '',         
    last_name: '',   
    email: '', 
      phone: '',         
    password: '',   
    specialty_id: '',  
    license_number: '',
      years_experience: '',         
    consultation_fee: '',   
    bio: '',  
    gender :'',
    home_service : false,
    video_consultation :false,
  },
  isLoading: false,
  error: null,
  success: false,
};

export const Add_Doctors = createAsyncThunk(
  "Log_in/Add_Doctors",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const response = await postData(
        `${BaseUrl}${ADMIN}${DOCTORS}`,
        state.Add_Doctors.formInfo,
        {},
        true
      );

      return response;
    } catch (err) {
      console.log("FULL ERROR", err);
      console.log("BACK RESPONSE", err.response?.data);

      return rejectWithValue(err);
    }
  }
);

const formSlice = createSlice({
  name: 'Add_Doctors',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Add_Doctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Add_Doctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
    .addCase(Add_Doctors.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.success = false;
})
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;