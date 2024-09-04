import { createSlice } from "@reduxjs/toolkit";
import { BlockUnblock_Users, Get_AllUsers, Get_RecentUsers, Get_Reported_Users, Get_Reportedby_UserDetails } from "./User.action";

let initialState = {
  loading: false,
  error: null,
  RercentUsers: [],
  AllUsers: {},
  ReportedUser:{},
  ReportedbyUsers:{}
};
const UsersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // --------- Get Recent Users ---------
    builder
      .addCase(Get_RecentUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_RecentUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.RercentUsers = action?.payload?.r;
      })
      .addCase(Get_RecentUsers.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // --------- Get All Users  ---------
    builder
      .addCase(Get_AllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_AllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.AllUsers = action?.payload;
      })
      .addCase(Get_AllUsers.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // --------- Get Reported  Users  ---------
    builder
      .addCase(Get_Reported_Users.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_Reported_Users.fulfilled, (state, action) => {
        state.loading = false;
        state.ReportedUser = action?.payload;
      })
      .addCase(Get_Reported_Users.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // --------- Get Reportedby Users  ---------
    builder
      .addCase(Get_Reportedby_UserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(Get_Reportedby_UserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.ReportedbyUsers = action?.payload;
      })
      .addCase(Get_Reportedby_UserDetails.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // --------- block Reported  Users  ---------
    builder
      .addCase(BlockUnblock_Users.pending, (state) => {
        state.loading = true;
      })
      .addCase(BlockUnblock_Users.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(BlockUnblock_Users.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default UsersSlice.reducer;
