import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    rol: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    startLogin: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token, rol } = action.payload;
      (state.user = user),
        (state.token = token),
        (state.rol = rol),
        (state.isLoading = false);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.rol = null;
      state.isLoading = false;
      state.error = action.payload?.error || null;
    },
  },
});
export const { loginSuccess, logOut, startLogin } = authSlice.actions;
export default authSlice.reducer;
