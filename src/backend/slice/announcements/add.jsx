import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ADMIN, ANNONCEMNTS, BaseUrl } from '../../Api';
import { postData } from '../../ApiServecies';

const initialState = {
  formInfo: {
    title: '',         
    content: '',   
    image_url: '',  // 🔑 سيحتوي الآن على كائن الملف الفعلي (File Object) وليس Base64
    is_active: false, 
    starts_at: '',
    ends_at: ''
  },
  isLoading: false,
  error: null,
  success: false,
};

export const AddAnnouncement = createAsyncThunk(
  'AddAnnouncement/submit',
  async (imageFile, { getState, rejectWithValue }) => { // 👈 تم تمرير الملف مباشرة هنا
    try {
      const state = getState();
      const { title, content, is_active, starts_at, ends_at } = state.AddAnnouncement.formInfo;

      const formData = new FormData();
      formData.append('title', title || "");
      formData.append('content', content || "");
      formData.append('is_active', is_active ? 1 : 0);
      formData.append('starts_at', starts_at || "");
      formData.append('ends_at', ends_at || "");
      
      // 🔑 المفتاح الصحيح كما يتوقعه الباك إند هو 'image'
      if (imageFile) {
        formData.append('image', imageFile); 
      }

      const response = await postData(
        `${BaseUrl}${ADMIN}${ANNONCEMNTS}`,
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        },
        true
      );

      return response;

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const formSlice = createSlice({
  name: 'AddAnnouncement',
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
      .addCase(AddAnnouncement.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(AddAnnouncement.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(AddAnnouncement.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
        state.success = false;
      });
  },
});

export const { setformInfo, resetForm, clearError } = formSlice.actions;
export default formSlice.reducer;