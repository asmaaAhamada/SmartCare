import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, putData } from '../../ApiServecies';
import { ADMIN, BaseUrl, DOCTORS } from '../../Api';


const initialState = {
 formInfo: {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    specialty_id: "",
    license_number: "",
    years_experience: "",
    consultation_fee: "",
    bio: "",
    gender: "",
    home_service: false,
    video_consultation: false,
},
  isLoading: false,
  error: null,
  success: false,
};

export const Edit_Doctor = createAsyncThunk(
  'Log_in/Edit_Doctor',
    async (_, { getState, rejectWithValue }) => {

const state = getState();

const formInfo = state.Edit_Doctor.formInfo;
    try {

     


     

      const response = await 
putData(
    `${BaseUrl}${ADMIN}${DOCTORS}/${formInfo.id}`,        formInfo,
        {},
        true
      );
      
      console.log("📦 Doctors Response:", response);
      return response;

    }catch (error) {
  console.log("SERVER ERROR", error.response?.data);

  return rejectWithValue(error.response?.data);
}
  }
);

const formSlice = createSlice({
  name: 'Edit_Doctor',
  initialState,
 reducers:{
    setFormData:(state,action)=>{
        state.formInfo={
            ...state.formInfo,
            ...action.payload
        };
    },

    updateFormField:(state,action)=>{
        const field=Object.keys(action.payload)[0];
        state.formInfo[field]=action.payload[field];
    },

    resetForm:(state)=>{
        state.formInfo={...initialState.formInfo};
    },

    clearError:(state)=>{
        state.error=null;
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(Edit_Doctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Edit_Doctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
    .addCase(Edit_Doctor.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.success = false;
})
  },
});

export const {
  setFormData,
  updateFormField,
  resetForm,
  clearError,
} = formSlice.actions;export default formSlice.reducer;