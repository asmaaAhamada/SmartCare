import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { BaseUrl, RESEPTION, STAFF } from '../../Api';

export const fetchQueue = createAsyncThunk(
  "program/fetchQueue",
  async (params, { rejectWithValue }) => {
    try {
      console.log("API CALL START", params);
      
      // بناء الرابط ودعم كويري السيرش إذا تم تمريره
      let url = `${BaseUrl}${STAFF}${RESEPTION}/queue`;
      if (params?.search) {
        url += `?search=${encodeURIComponent(params.search)}`;
      }

      const response = await getData(url);
      console.log("API RESPONSE", response);
      return response;
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'fetchQueue',
  initialState: {
    Loading: false,
    data: null, // تهيئة بـ null للتمكن من فحص وجود الداتا لاحقاً بمرونة
    error: null
  },
  reducers: {}, 
  extraReducers: builder => {
    builder
      .addCase(fetchQueue.pending, (state) => {
        state.Loading = true;
      })
      .addCase(fetchQueue.fulfilled, (state, action) => {
        state.Loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQueue.rejected, (state, action) => {
        state.Loading = false;
        state.error = action.payload; 
      });
  }
});
  
export default counterSlice.reducer;