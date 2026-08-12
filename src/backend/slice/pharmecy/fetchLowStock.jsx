import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import { ADMIN, BaseUrl, PHARMECY, PRESCRIPTION, STAFF } from '../../Api';




export const fetchLowStock= createAsyncThunk(
  "program/fetchLowStock",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${STAFF}${PHARMECY}/inventory/low-stock`
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
    name: 'fetchLowStock',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
   reducers: {
    resetLowStockState: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    }
  }, extraReducers: builder => {
        builder
          .addCase(fetchLowStock.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchLowStock.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchLowStock.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer