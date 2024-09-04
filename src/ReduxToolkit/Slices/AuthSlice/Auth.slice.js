import { createSlice } from "@reduxjs/toolkit";
import { Admin_Login, Admin_Logout } from "./Auth.action";
let initialState = {
  loading: false,
  error: null,
  Authdata: {},
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // --------- Login ---------
    builder
      .addCase(Admin_Login.pending, (state) => {
        state.loading = true;
      })
      .addCase(Admin_Login.fulfilled, (state, action) => {
        state.loading = false;
        state.Authdata = action?.payload?.r;
      })
      .addCase(Admin_Login.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // --------- Logout ---------
    builder
      .addCase(Admin_Logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(Admin_Logout.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(Admin_Logout.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // --------- Forgot password  ---------
  },
});

export default AuthSlice.reducer;
