import { createSlice } from "@reduxjs/toolkit";

// ✅ لو فيه user مخزّن في localStorage نسترجعه
const storedUser = localStorage.getItem("user");

const initialState = {
  isLoggedIn: storedUser ? true : false,
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      // ✅ نخزن في localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      // ✅ نحذف من localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
