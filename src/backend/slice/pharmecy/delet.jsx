import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { deleteData, getData } from '../../ApiServecies';
import { BaseUrl, MEDICATION, PHARMECY, PRESCRIPTION, STAFF } from '../../Api';



const initialState = {
  loading: false,
  success: false,
  data: null,
  error: null,
};
export const delet_medecein= createAsyncThunk(
  "program/delet_medecein",
  async (id, { rejectWithValue }) => {
    try {
      console.log("API CALL START");

      const response = await deleteData(
        `${BaseUrl}${STAFF}${PHARMECY}${MEDICATION}/${id}`
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
  name: "delet_medecein",
  initialState,

  reducers: {
    resetDeleteMedicineState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(delet_medecein.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(delet_medecein.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })

      .addCase(delet_medecein.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeleteMedicineState } =
counterSlice.actions;
  
 
  export const { resetDetails } = counterSlice.actions;
  
  export default counterSlice.reducer