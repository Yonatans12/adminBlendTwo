import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice/Auth.slice";
import UsersSlice from "./Slices/UserSlice/User.slice";
import DashboardSlice from "./Slices/Dashboard/Dashboard.slice";
import ContentManageSlice from "./Slices/ContentManagment/ContentManage.slice";
export const Store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Users: UsersSlice,
    Dashboard: DashboardSlice,
    ContentManage:ContentManageSlice
  },
});
