import dashlogo from "../Assets/Logo/Dashboard.png";
import a_dashlogo from "../Assets/Logo/activeDashboard.png";

import userlogo from "../Assets/Logo/Users.png";
import a_userlogo from "../Assets/Logo/activeUsers.png";

import content from "../Assets/Logo/ContentManagnent.png";
import a_content from "../Assets/Logo/activeContentManagnent.png";


import notification from  "../Assets/Logo/Notifications.png";
import a_notification from  "../Assets/Logo/activeNotifications.png";

import reportuser from  "../Assets/Logo/Reportuser.png";
import a_reportuser from  "../Assets/Logo/activeReportuser.png";

import setting from  "../Assets/Logo/Settings.png";
import a_setting from  "../Assets/Logo/activeSettings.png";

import call from  "../Assets/Logo/Call.png";
import a_call from  "../Assets/Logo/acall.png";


export let sidebarcontent = [
    {
      logo: dashlogo,
      Activelogo: a_dashlogo,
      Title: "Dashboard",
      location: "/",
    },
    {
      logo: userlogo,
      Activelogo: a_userlogo,
      Title: "Users",
      location: "/users",
    },
    {
      logo: content,
      Activelogo: a_content,
      Title: "Content Management",
      location: "/content-management",
    },
 
    {
      logo: reportuser,
      Activelogo: a_reportuser,
      Title: "Report User",
      location: "/report-user",
    },
  
    
    {
      logo: notification,
      Activelogo: a_notification,
      Title: "Notiifcations ",
      location: "/notifications",
    },
   
    {
      logo: setting,
      Activelogo: a_setting,
      Title: "Setting ",
      location: "/setting",
    },
   
    {
      logo: call,
      Activelogo: a_call,
      Title: "Contact us  ",
      location: "/contactus",
      key:1
    },
  ];
