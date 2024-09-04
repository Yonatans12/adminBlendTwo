import { createSlice } from "@reduxjs/toolkit";
import { AddNotification, GetDashAnalyticsdata, GetNotifications } from "./Dashboard.action";
 
let initialState = {
  loading: false,
  error: null,
  AnalyticsData: [],
  Notification: [],
};

const Dashboardslice = createSlice({
  name: "DashboardData",
  initialState,
  extraReducers: (builder) => {
 
    // --------- Get Dashboard Content ---------
    builder
      .addCase(GetDashAnalyticsdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetDashAnalyticsdata.fulfilled, (state, action) => {
        state.loading = false;
        state.AnalyticsData = action?.payload?.r;
      })
      .addCase(GetDashAnalyticsdata.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  
   
    // ---------------- Notifications ----------------

    // ---------  Add Notification ---------
    builder
      .addCase(AddNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNotification.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddNotification.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
    // ---------  Get Notification ---------

    builder
      .addCase(GetNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.Notification = action?.payload;
      })
      .addCase(GetNotifications.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });

  
  },
});

export default Dashboardslice.reducer;
