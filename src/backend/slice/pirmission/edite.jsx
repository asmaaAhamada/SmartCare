import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putData } from "../../ApiServecies";
import { ADMIN, BaseUrl, Roles } from "../../Api";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const Update_Role = createAsyncThunk(
  "roles/Update_Role",
  async ({ id, roleData }, { rejectWithValue }) => {
    try {
      const response = await putData(
        `${BaseUrl}${ADMIN}${Roles}/${id}`,
        roleData,
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

const updateRoleSlice = createSlice({
  name: "Update_Role",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(Update_Role.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(Update_Role.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(Update_Role.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default updateRoleSlice.reducer;