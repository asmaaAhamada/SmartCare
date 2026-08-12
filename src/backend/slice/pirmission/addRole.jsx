import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../ApiServecies';
import { ADMIN, BaseUrl, Roles } from '../../Api';


const initialState = {
  formInfo: {
    name: '',         
    display_name: '',   
    description: '', 
      permissions: [],         
  
  },
  Loading: false,
  error: null,
  success: false,
};

export const Add_Role = createAsyncThunk(
  "roles/Add_Role",
  async (roleData, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}${ADMIN}${Roles}`,
        roleData,
        {},
        true
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "فشل إنشاء الدور"
      );
    }
  }
);

const formSlice = createSlice({
  name: 'Add_Role',
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
      .addCase(Add_Role.pending, (state) => {
        state.Loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Add_Role.fulfilled, (state, action) => {
        state.Loading = false;
        state.success = true;
      })
      .addCase(Add_Role.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;