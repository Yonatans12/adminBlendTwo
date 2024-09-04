import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../Api";

export const Admin_Login = createAsyncThunk("auth/login", async (logindata) => {
  try {
    let data = await axios.post(`${BaseUrl}/api/auth/signup-login`, logindata);
    return data.data;
  } catch (error) {
    throw error;
  }
});

export const Admin_Logout = createAsyncThunk("auth/logout", async (logindata) => {
  try {
    localStorage.removeItem("Blendtwo_admin")
    return "Logout Sucesss"
  } catch (error) {
    throw error;
  }
});


