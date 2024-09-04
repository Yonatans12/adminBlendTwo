import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Api";
import axios from "axios";

const authdata = JSON.parse(localStorage.getItem("Blendtwo_admin"));
let headers = { headers: { apikey: authdata?.apikey, token: authdata?.token } };

export const Get_RecentUsers = createAsyncThunk(
  "users/getrecentusers",
  async () => {
    try {
      let data = await axios.post(
        `${BaseUrl}/api/user/get-all`,
        { type: 1 },
        { ...headers }
      );

      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const Get_AllUsers = createAsyncThunk(
  "users/getallusers",
  async (count) => {
    try {
      let data = await axios.post(
        `${BaseUrl}/api/user/get-all`,
        { type: 2, count: count },
        { ...headers }
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const Get_Reported_Users = createAsyncThunk(
  "users/getreportedusers",
  async (count) => {
    try {
      let data = await axios.post(
        `${BaseUrl}/api/user/reported-user`,
        { type: 2, count: count },
        { ...headers }
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);
export const Get_Reportedby_UserDetails = createAsyncThunk(
  "users/getreportedbyusers",
  async ({userid,count}) => {
    try {
      let data = await axios.get(
        `${BaseUrl}/api/user/reporting-user?id=${userid}&count=${count}`,
    
        { ...headers }
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const BlockUnblock_Users = createAsyncThunk(
  "users/blockunblockuser",
  async (userdata) => {
    try {
      let data = await axios.post(
        `${BaseUrl}/api/content/banned-unbanned-user`,
        userdata,
        { ...headers }
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);
