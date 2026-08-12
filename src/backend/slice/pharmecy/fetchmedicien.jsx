import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { getData } from '../../ApiServecies';
import { ADMIN, BaseUrl, MEDICATION, PHARMECY, STAFF } from '../../Api';




export const fetchmedications = createAsyncThunk(
  "program/fetchmedications",
  async (search = "", { rejectWithValue }) => {
    try {

      const url = search
        ? `${BaseUrl}${STAFF}${PHARMECY}${MEDICATION}/search?name=${search}`
        : `${BaseUrl}${STAFF}${PHARMECY}${MEDICATION}`;

      const response = await getData(url);

      return response;

    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'fetchmedications',
    initialState: {
       isLoading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchmedications.pending, (state, action) => {
            state.isLoading = true
          })
          .addCase(fetchmedications.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            
          })
       .addCase(fetchmedications.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload; 
          })
        }
  })
  
 
  
  export default counterSlice.reducer