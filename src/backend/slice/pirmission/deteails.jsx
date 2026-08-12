import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import { ADMIN, BaseUrl, Roles } from '../../Api';




export const fetchDetailsRoles= createAsyncThunk(
  "program/fetchDetailsRoles",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await getData(
        `${BaseUrl}${ADMIN}${Roles}/${id}`
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
    name: 'fetchDetailsRoles',
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
          .addCase(fetchDetailsRoles.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchDetailsRoles.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchDetailsRoles.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  export const { resetDetails } = counterSlice.actions;
  
  export default counterSlice.reducer