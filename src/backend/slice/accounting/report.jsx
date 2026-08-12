import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl, STAFF } from "../../Api";
import { getData } from "../../ApiServecies";

export const fetchreport = createAsyncThunk(
  "accounting/fetchreport",
  async (
    {
      type = "summary",
      date = "",
      month = "",
      year = "",
    } = {},
    { rejectWithValue }
  ) => {
    try {
      let url = "";

      switch (type) {
        case "daily":
          url = `${BaseUrl}${STAFF}/accounting/reports/daily?date=${date}`;
          break;

        case "monthly":
          url = `${BaseUrl}${STAFF}/accounting/reports/monthly?month=${month}&year=${year}`;
          break;

        default:
          url = `${BaseUrl}${STAFF}/accounting/reports/summary`;
      }

      const response = await getData(url);

      return {
        type,
        data: response.data,
      };
    } catch (err) {
      return rejectWithValue(err?.message || "حدث خطأ");
    }
  }
);

const reportSlice = createSlice({
  name: "fetchreport",

  initialState: {
    isLoading: false,
    data: null,
    reportType: "summary",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchreport.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchreport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.reportType = action.payload.type;
      })

      .addCase(fetchreport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;