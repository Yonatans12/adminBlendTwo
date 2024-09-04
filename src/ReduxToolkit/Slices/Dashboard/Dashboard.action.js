import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Api";
const authdata = JSON.parse(localStorage.getItem("Blendtwo_admin"));
let headers = { headers: { apikey: authdata?.apikey, token: authdata?.token } };

//  -------------  Get Dashboard Data   -----------
export const GetDashAnalyticsdata = createAsyncThunk(
  "DashboardData/getanyalitics",
  async (type) => {
    try {
      const config = {
        ...headers,
      };
      let data = await axios.get(
        `${BaseUrl}/api/dashboard/analytics?type=${type}`,
        config
      );
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

// ----------------------- Notifications -------------------

export const AddNotification = createAsyncThunk(
  "DashboardData/addnotification",
  async (notificationData) => {
    try {
      const config = {
        ...headers,
      };

      let data = await axios.post(
        `${BaseUrl}/api/notification/send`,notificationData,
        config
      );
      return data.data;
    } catch (error) {
      throw error;
    }
  }
)

//  -------------   Get Notifications Data   -----------
export const GetNotifications = createAsyncThunk(
"DashboardData/getnotification",
async () => {
  try {
    const config = {
      ...headers,
    };
    let data = await axios.get(`${BaseUrl}/api/notification/get-list`, config);
    return data.data;
  } catch (error) {
    throw error;
  }
}
)
