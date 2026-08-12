import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData, putData } from "../../ApiServecies";
import { ADMIN, BaseUrl, MEDICATION, PHARMECY, STAFF } from "../../Api";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const ADD_medications = createAsyncThunk(
  "medicationss/ADD_medications",
  async ({ generic_name ,manufacturer, name , price ,category,dosage_form,strength,barcode }, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}${STAFF}${PHARMECY}${MEDICATION}`,
        {generic_name ,manufacturer, name , price ,category,dosage_form,strength,barcode },
        {},
        true
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "فشل تعديل الدور"
      );
    }
  }
);

const ADDmedicationsSlice = createSlice({
  name: "ADD_medications",
  initialState,
 reducers:{
    resetAddMedicineState:(state)=>{
        state.loading=false;
        state.success=false;
        state.error=null;
    }}
,

  extraReducers: (builder) => {
    builder

      .addCase(ADD_medications.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(ADD_medications.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(ADD_medications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetAddMedicineState } =
ADDmedicationsSlice.actions;
export default ADDmedicationsSlice.reducer;