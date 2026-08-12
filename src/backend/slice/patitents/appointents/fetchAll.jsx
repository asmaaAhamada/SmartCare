import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ADMIN, APPINTMENT, BaseUrl } from '../../../Api';
import { getData } from '../../../ApiServecies';





export const fetchAPPINTMENT= createAsyncThunk(
  "program/fetchAPPINTMENT",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${ADMIN}${APPINTMENT}`
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
    name: 'fetchAPPINTMENT',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchAPPINTMENT.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchAPPINTMENT.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchAPPINTMENT.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer