import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { ADMIN, ANNONCEMNTS, BaseUrl } from '../../Api';
import { getData } from '../../ApiServecies';




export const fetchAnnouncement = createAsyncThunk(
  "program/fetchAnnouncement",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${ADMIN}${ANNONCEMNTS}`
      );

      // console.log("API RESPONSE", response);

      return response;
    } catch (error) {
      console.log("API ERROR", error);

      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchAnnouncement',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchAnnouncement.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchAnnouncement.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchAnnouncement.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer