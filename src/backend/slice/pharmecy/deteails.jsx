import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import { BaseUrl, PHARMECY, PRESCRIPTION, STAFF } from '../../Api';




export const fetchDetailsprescriptions= createAsyncThunk(
  "program/fetchDetailsprescriptions",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${STAFF}${PHARMECY}${PRESCRIPTION}/${id}`
      );

      console.log("API RESPONSE", response);

      return response;
    } catch (error) {
      console.log("API ERROR", error);

      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchDetailsprescriptions',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    resetDetails: (state) => {
      state.data = null;
      state.error = null;
    }}, extraReducers: builder => {
        builder
          .addCase(fetchDetailsprescriptions.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchDetailsprescriptions.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchDetailsprescriptions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  export const { resetDetails } = counterSlice.actions;
  
  export default counterSlice.reducer