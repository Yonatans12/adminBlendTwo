import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Notificationsicon from "../Assets/Logo/bellicon.png";
import { GetNotifications } from "../ReduxToolkit/Slices/Dashboard/Dashboard.action";
import { formatTime } from "../ReduxToolkit/Api";
import PageTitle from "./PageTitle";
import Historycard from "./Historycard";

const NotificationHistory = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetNotifications());
  }, [dispatch]);

  let NotificationsData = useSelector((store) => store?.Dashboard);

  const categorizeNotifications = (notifications) => {
    const Today = new Date();
    const Yesterday = new Date(Today);
    Yesterday.setDate(Today.getDate() - 1);
    const Tomorrow = new Date(Today);
    Tomorrow.setDate(Today.getDate() + 1);

    const pendingNotifications = { Today: [], Tomorrow: [], OtherDates: {} };
    const completedNotifications = { Today: [], Yesterday: [], OtherDates: {} };

    notifications.forEach((notification) => {
      const notificationDate = new Date(notification?.date_time);
      const isToday = notificationDate.toDateString() === Today.toDateString();
      const isYesterday =
        notificationDate.toDateString() === Yesterday.toDateString();
      const isTomorrow =
        notificationDate.toDateString() === Tomorrow.toDateString();

      if (notification.is_sent === 0) {
        // Pending notification
        if (isToday || isTomorrow) {
          if (isToday) {
            pendingNotifications.Today.push(notification);
          } else {
            pendingNotifications.Tomorrow.push(notification);
          }
        } else {
          const formattedDate = notificationDate.toDateString();
          if (!pendingNotifications.OtherDates[formattedDate]) {
            pendingNotifications.OtherDates[formattedDate] = [];
          }
          pendingNotifications.OtherDates[formattedDate].push(notification);
        }
      } else {
        // Completed notification
        if (isToday) {
          completedNotifications.Today.push(notification);
        } else if (isYesterday) {
          completedNotifications.Yesterday.push(notification);
        } else {
          const formattedDate = notificationDate.toDateString()
          if (!completedNotifications.OtherDates[formattedDate]) {
            completedNotifications.OtherDates[formattedDate] = [];
          }
          completedNotifications.OtherDates[formattedDate].push(notification);
        }
      }
    });
    return { pendingNotifications, completedNotifications };
  }
  
  const { pendingNotifications, completedNotifications } =
    categorizeNotifications(NotificationsData?.Notification?.r || []);

  // const categorizedNotifications = categorizeNotifications(
  //   NotificationsData?.Notification?.r || []
  // );
  // const [isNotificationOpen, setisNotificationOpen] = useState(false);
  // let [selectedData, setSelectedData] = useState({});
  // const EditNotificationOpen = (data) => {
  //   setSelectedData(data);
  //   setisNotificationOpen(true);
  // };
  // const CloseEditPopup = () => {
  //   setisNotificationOpen(false);
  // };

   

  const [notificationType, setnotificationtype] = React.useState("pending");

  const handleChange = (event, type) => {
    
    if (notificationType === type) {
      return
    }else{
      setnotificationtype(type);
    }
  };

  return (
    <div>
      <PageTitle Title={"Notification History "} />
      <ToggleButtonGroup
        color="primary"
        value={notificationType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ textTransform: "capitalize" }}
      >
        <ToggleButton
          value="pending"
          sx={{
            textTransform: "capitalize",
            width: "180px",
            border: "1px solid rgba(64, 196, 255, 1)",
            borderRadius: "10px",
            "&.Mui-selected": {
              bgcolor: "rgba(64, 196, 255, 1)",
              color: "#fff",
            },
            "&:hover": {
              bgcolor:  "rgba(239, 250, 255, 1)",
              color: "#000",
            },
          }}
          disabled={notificationType==="pending"}
        >
          Scheduled
        </ToggleButton>
        <ToggleButton
          value="completed"
          sx={{
            textTransform: "capitalize",
            border: "1px solid rgba(64, 196, 255, 1)",
            borderRadius: "10px",
            width: "180px",
            "&.Mui-selected": {
              bgcolor: "rgba(64, 196, 255, 1)",
              color: "#fff",
            },
            "&:hover": {
              bgcolor: "rgba(239, 250, 255, 1)",
              color: "#000",
            },
          }}
          disabled={notificationType==="completed"}
        >
          Completed
        </ToggleButton>
      </ToggleButtonGroup>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: "10px",
          height: "82vh",
          overflow: "auto",
          boxSizing: "border-box",
          width: "100%",
          // border:"solid red"
        }}
      >
        {notificationType === "pending" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: "10px",
              height: "89vh",
              overflow: "auto",
              boxSizing: "border-box",
            }}
          >
            {pendingNotifications.Today.length > 0 && (
              <>
                <Typography variant="h6">Today</Typography>
                {pendingNotifications.Today.map((el) => (
                  <Historycard el={el} NotificationsData={NotificationsData} />
                ))}
              </>
            )}

            {pendingNotifications.Tomorrow.length > 0 && (
              <>
                <Typography variant="h6">Tomorrow</Typography>
                {pendingNotifications.Tomorrow.map((el) => (
                  <Historycard el={el} NotificationsData={NotificationsData} />
                ))}
              </>
            )}

            {Object.entries(pendingNotifications.OtherDates).map(
              ([date, notifications]) => (
                <React.Fragment key={date}>
                  <Typography variant="h6">{date}</Typography>
                  {notifications.map((el) => (
                    <Historycard
                      el={el}
                      NotificationsData={NotificationsData}
                    />
                  ))}
                </React.Fragment>
              )
            )}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: "10px",
              height: "89vh",
              overflow: "auto",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            {completedNotifications.Today.length > 0 && (
              <>
                <Typography variant="h6">Today</Typography>
                {completedNotifications.Today.map((el) => (
                  <Historycard el={el} NotificationsData={NotificationsData} />
                ))}
              </>
            )}
            {completedNotifications.Yesterday.length > 0 && (
              <>
                <Typography variant="h6">Yesterday</Typography>
                {completedNotifications.Yesterday.map((el) => (
                  <Historycard el={el} NotificationsData={NotificationsData} />
                ))}
              </>
            )}
            {Object.entries(completedNotifications.OtherDates).map(
              ([date, notifications]) => (
                <React.Fragment key={date}>
                  <Typography variant="h6">{date}</Typography>
                  {notifications.map((el) => (
                    <Historycard
                      el={el}
                      NotificationsData={NotificationsData}
                    />
                  ))}
                </React.Fragment>
              )
            )}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default NotificationHistory;
