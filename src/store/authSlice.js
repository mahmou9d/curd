import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  refresh: localStorage.getItem("refresh") || "",
  access: localStorage.getItem("access") || "",
  loading: "idle",
  error: null,
};

// =============================
// Async Thunks
// =============================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://projects-production-9397.up.railway.app/api/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const refreshToken = state.auth.refresh;
      if (!refreshToken) throw new Error("No refresh token available");

      const res = await fetch(
        "https://projects-production-9397.up.railway.app/api/token/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://projects-production-9397.up.railway.app/api/signup/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json(); 
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// =============================
// Slice
// =============================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.access = "";
      state.refresh = "";
      state.loading = "idle";
      state.error = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    resetAuthState: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Unexpected error";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.access = action.payload.access;
        localStorage.setItem("access", action.payload.access);
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log(action.payload,"gdgggggdggg");
        state.loading = "succeeded";
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload || "Unexpected error";
      });
  },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
