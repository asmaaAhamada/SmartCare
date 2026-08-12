import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postData, putData } from '../../ApiServecies';
import { ADMIN, BaseUrl, Clincs } from '../../Api';

const initialState = {
  formInfo: {
    id: null,
    name: "",
    room_number: "",
    description: "",
    phone: "",
    is_active: true,
    specialty_id: "",
    floor: "",
  },
  isLoading: false,
  error: null,
  data: []
};

export const EditeClinic = createAsyncThunk(
    "program/EditeClinic",
    async (formData, { rejectWithValue }) => {

        try {

            const response = await putData(
                `${BaseUrl}${ADMIN}${Clincs}/${formData.id}`,
                formData,
                {},
                true
            );

            return response;

        } catch (error) {

            return rejectWithValue(
                error?.response?.data || error.message
            );

        }

    }
);
export const counterSlice = createSlice({
  name: 'EditeClinic',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formInfo[field] = value;
    },

    setFormData: (state, action) => {
      state.formInfo = action.payload;
    },

    resetForm: (state) => {
      state.formInfo = initialState.formInfo;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(EditeClinic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(EditeClinic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(EditeClinic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
}); // <-- هذا كان ناقص

export const {
  updateFormField,
  resetForm,
  setFormData
} = counterSlice.actions;

export default counterSlice.reducer;