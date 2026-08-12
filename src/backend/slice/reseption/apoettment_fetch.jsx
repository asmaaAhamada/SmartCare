import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../ApiServecies';
import { ADMIN, APOINNTS, BaseUrl, RESEPTION, STAFF } from '../../Api';

export const fetchAPPOETMENT = createAsyncThunk(
  "program/fetchAPPOETMENT",
  async (filters = {}, { rejectWithValue }) => {
    try {
      console.log("API CALL START WITH FILTERS:", filters);
      
      const { date, doctor, status } = filters;
      let url = `${BaseUrl}${STAFF}${RESEPTION}${APOINNTS}`;
      
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (doctor) params.append('doctor', doctor);
      if (status) params.append('status', status);
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const response = await getData(url);
      console.log("API RESPONSE IN THUNK:", response);
      return response;
    } catch (error) {
      console.log("API ERROR", error);
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchAPPOETMENT',
    initialState: {
       isLoading: false,
       data: [], 
       error: null
    },
    reducers: {}, 
    extraReducers: builder => {
        builder
          .addCase(fetchAPPOETMENT.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(fetchAPPOETMENT.fulfilled, (state, action) => {
            state.isLoading = false;
            // تعديل طريقة التخزين هنا لتمسك الكائن بالكامل أو الإعلانات داخله كـ Fallback
            state.data = action.payload?.data?.announcements || action.payload?.data || action.payload || [];
          })
          .addCase(fetchAPPOETMENT.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          });
    }
});
  
export default counterSlice.reducer;