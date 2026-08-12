import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postData, putData } from "../../ApiServecies";
import { ADMIN, BaseUrl, MEDICATION, PHARMECY, STAFF } from "../../Api";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const ADD_inventory_restok = createAsyncThunk(
  "inventory_restoks/ADD_inventory_restok",
  async ({ medication_id, quantity }, { rejectWithValue }) => {
    try {
      const response = await postData(
        `${BaseUrl}${STAFF}${PHARMECY}/inventory/restock`,
        {
          medication_id,
          quantity,
        },
        {},
        true
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error.message ||
        "فشل تحديث المخزون"
      );
    }
  }
);

const ADDinventory_restokSlice = createSlice({
  name: "ADD_inventory_restok",
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

      .addCase(ADD_inventory_restok.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(ADD_inventory_restok.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(ADD_inventory_restok.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetAddMedicineState } =
ADDinventory_restokSlice.actions;
export default ADDinventory_restokSlice.reducer;