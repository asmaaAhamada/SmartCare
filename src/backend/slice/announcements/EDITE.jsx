import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADMIN, ANNONCEMNTS, BaseUrl } from "../../Api";
import { putData } from "../../ApiServecies";

const initialState = {
  form: {
    title: "",
    content: "",
    image_url: "",
    is_active: false,
    starts_at: "",
    ends_at: "",
  },

  isLoading: false,
  error: null,
  success: false,
};

export const editeAnnouncement = createAsyncThunk(
  "editeAnnouncement/submit",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const {
        title,
        content,
        is_active,
        starts_at,
        ends_at,
        image_url,
      } = state.editeAnnouncement.form;

      const jsonPayload = {
        title: title || "",
        content: content || "",
        is_active: Boolean(is_active),
        starts_at: starts_at || "",
        ends_at: ends_at || "",
        image_url: image_url || null,
      };

      const response = await putData(
        `${BaseUrl}${ADMIN}${ANNONCEMNTS}/${id}`,
        jsonPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        false
      );

      console.log("📦 Edit Announcement Response:", response);

      return response;
    } catch (error) {
      console.error("❌ Edit Announcement Error:", error);

      if (error?.response?.data) {
        const serverData = error.response.data;

        if (serverData.errors) {
          const detailMessages = Object.entries(
            serverData.errors
          ).map(([field, messages]) => {
            return `${field}: ${
              Array.isArray(messages)
                ? messages.join(", ")
                : messages
            }`;
          });

          return rejectWithValue(
            detailMessages.join(" | ")
          );
        }

        if (serverData.message) {
          return rejectWithValue(
            serverData.message
          );
        }
      }

      return rejectWithValue(
        error?.message ||
          "فشل تعديل الإعلان"
      );
    }
  }
);

const formSlice = createSlice({
  name: "editeAnnouncement",

  initialState,

  reducers: {
    setform: (state, action) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },

    resetForm: (state) => {
      state.form = {
        title: "",
        content: "",
        image_url: "",
        is_active: false,
        starts_at: "",
        ends_at: "",
      };

      state.error = null;
      state.success = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    setAnnouncementData: (
      state,
      action
    ) => {
      state.form = {
        title:
          action.payload?.title || "",
        content:
          action.payload?.content || "",
        image_url:
          action.payload?.image_url || "",
        is_active:
          action.payload?.is_active ||
          false,
        starts_at:
          action.payload?.starts_at ||
          "",
        ends_at:
          action.payload?.ends_at || "",
      };
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        editeAnnouncement.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        editeAnnouncement.fulfilled,
        (state) => {
          state.isLoading = false;
          state.success = true;
        }
      )

      .addCase(
        editeAnnouncement.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload;
          state.success = false;
        }
      );
  },
});

export const {
  setform,
  resetForm,
  clearError,
  setAnnouncementData,
} = formSlice.actions;

export default formSlice.reducer;