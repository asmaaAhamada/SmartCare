import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import { ADMIN, BaseUrl, PHARMECY, PRESCRIPTION, STAFF } from '../../Api';




export const fetchReport= createAsyncThunk(
  "program/fetchReport",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${STAFF}${PHARMECY}/reports/stock`
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
    name: 'fetchReport',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchReport.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchReport.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchReport.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer