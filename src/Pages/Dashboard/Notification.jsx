import React, { useState } from "react";
// import TitleText from "../../../Components/TitleText";
import {
  Box,
  Divider,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
// import ActionButton from "../../../Components/Popups/PopupComponent/ActionButton";
// import NotificationHistory from "../../../Components/NotificationHistory";
import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
// import { errortost, sucesstost } from "../../../Components/Alerts/CustomAlert";
import { useDispatch } from "react-redux";
// import {
//   AddNotification,
//   GetNotifications,
// } from "../../../Redux/Slices/Dashboard/Dashboard.action";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import PageTitle from "../../Components/PageTitle";
import CustomLoaderButton from "../../Components/CustomLoaderButton";
import NotificationHistory from "../../Components/NotificationHistory";
import {
  AddNotification,
  GetNotifications,
} from "../../ReduxToolkit/Slices/Dashboard/Dashboard.action";
import toast from "react-hot-toast";
const Notification = () => {
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [DateandTimeError, steDateandTimeError] = useState(false);
  let [notificationcondition, setnotifactioncondition] = useState(1);
  let [Title, setTitle] = useState("");
  let [Description, setDescription] = useState("");
  const [SelectedDateTime, setFormattedDateTime] = useState("");
  let dispatch = useDispatch();
 
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFormattedDateTime("");
    setnotifactioncondition(1);
    setTitleError(false);
    setDescriptionError(false);
    steDateandTimeError(false);
  };
  const handeldDateandTime = (dateTime) => {
    if (dateTime  ) {
      steDateandTimeError(false);
      setFormattedDateTime(dateTime);
    } else {
      toast.error("Please Select Date and Time !");
    }
  };

  let handeldinputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
      setTitleError(!value.trim());
    } else if (name === "Description") {
      setDescription(value);
      setDescriptionError(!value.trim());
    }
  };

  let handeldCondition = (e) => {
    setnotifactioncondition(e?.target?.value);
  };

  const handleSubmit = () => {
    const selectedDateTimeMoment = moment.utc(SelectedDateTime);
    const currentDateTimeMoment = moment.utc();
    setTitleError(!Title.trim());
    setDescriptionError(!Description.trim());

    if (notificationcondition === 2) {
      steDateandTimeError(!SelectedDateTime);
    }
    if (
      (notificationcondition === 1 && (!Title.trim() || !Description.trim())) ||
      (notificationcondition === 2 && (!Title.trim() || !Description.trim()))
    ) {
      toast.error("Please fill all the fields.");
      return;
    } else if (notificationcondition === 2 && SelectedDateTime === "") {
      toast.error("Please fill all fields !");
      steDateandTimeError(true); //
      return;
    } else if (
      notificationcondition === 2 &&
      selectedDateTimeMoment.isBefore(currentDateTimeMoment)
    ) {
      toast.error("Date and time must be in the future.");
      steDateandTimeError(true); //
      return;
    }else if(SelectedDateTime?._isValid==false
      ) 
    {
      toast.error("please select date in correct format !")
      return
    }
    
    
    
    else if (
      notificationcondition === 1 &&
      (!Title.trim() || !Description.trim())
    ) {
      return;
    }

    if (Title.length > 50) {
      setTitleError(true);
      toast.error("Title should be less than 50 characters !");
      return;
    } else if (Description.length > 150) {
      setDescriptionError(true);
      toast.error("Description should be less than 150 characters !");
      return;
    }

    let notificationData = new FormData();

    notificationData.append("title", Title);
    notificationData.append("message", Description);

    if (notificationcondition === 2) {
      notificationData.append(
        "date_time",
        selectedDateTimeMoment.format("YYYY-MM-DD hh:mm:ss")
      );
      notificationData.append("type", 1);
    } else {
      notificationData.append("type", 2);
    }
    dispatch(AddNotification(notificationData))
      .unwrap()
      .then((result) => {
        if (result?.s === 1) {
          dispatch(GetNotifications());
          toast(result?.m, {
            icon: "🔔",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.error(result?.m);
        }
      });
    resetForm();
    // sucesstost("Notification Sent Successfully !");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        gap: "20px",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <PageTitle Title={"Notifications"} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel
            id="demo-select-small-label"
            sx={{
              fontSize: "15px",
              color: titleError ? "red" : "#000",
            }}
          >
            Notification Title
          </InputLabel>

          <OutlinedInput
            placeholder={"Title"}
            sx={{
              width: "100%",
              height: "50px",
              // borderRadius: "10px",
              // border: "1px solid #40C4FF",
              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            value={Title?.trimStart()}
            onChange={handeldinputChange}
            name="title"
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel
            id="demo-select-small-label"
            sx={{
              fontSize: "15px",
              color: descriptionError ? "red" : "#000",
            }}
          >
            Description
          </InputLabel>
          <TextField
            name="Description"
            id="filled-multiline-static"
            placeholder={"Description"}
            sx={{
              width: "100%",
              // borderRadius: "20px",
              
              // border: "1px solid #40C4FF",
              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
            multiline
            rows={5}
            value={Description?.trimStart()}
            onChange={handeldinputChange}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <InputLabel
            id="demo-select-small-label"
            sx={{
              fontSize: "15px",
              color: "#000",
            }}
          >
            Select Type
          </InputLabel>
          <Select
            sx={{
              width: "100%",
              height: "50px", // Adjust the height as needed
              // borderRadius: "10px",
              // border: "1px solid #40C4FF",
              // boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            }}
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={notificationcondition}
            onChange={handeldCondition}
            name="notificationtype"
          >
            <MenuItem value={1}>Now </MenuItem>
            <MenuItem value={2}>Schedule</MenuItem>
          </Select>
        </Box>

        {notificationcondition == 1 ? (
          ""
        ) : (
          <LocalizationProvider
            dateAdapter={AdapterMoment}
            sx={{ mt: "-10px" }}
          >
            <DemoContainer components={["DateTimePicker"]}>
              <InputLabel
                id="demo-select-small-label"
                sx={{
                  fontSize: "15px",
                  color: DateandTimeError ? "red" : "#000",
                }}
              >
                Select Date and Time
              </InputLabel>
              <DateTimePicker
    
                sx={{
                  borderRadius: "10px",

                  width: "100%",
                  "& label": {
                    color: "#000",
                  },
                  "& .MuiInputBase-input": {
                    color: "#000",
                  },
                }}
                slotProps={{
                  openPickerIcon: {
                    style: {
                      color: "rgba(64, 196, 255, 1)",
                    },
                  },
                }}
                onChange={handeldDateandTime}
                inputFormat={{
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }}
                renderInput={(props) => <TextField {...props} />}
                inputProps={{
                  min: moment().format("YYYY-MM-DD"), // Set the minimum allowed date to today
                  readOnly: true 
                }}
                minDate={moment()}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}

        {/* ------- Date and Time Input ------------- */}

        <Box sx={{ width: "50%", m: "auto", mt: "20px" }}>
          <CustomLoaderButton btn_title={"Send"} onClick={handleSubmit} />
        </Box>
      </Box>
      <Divider
        sx={{ height: { xs: "1vh", md: "95vh" } }}
        orientation={"vertical"}
        flexItem
      ></Divider>
      {/* ---------- Notification History ------ */}
      <Box sx={{ width: { xs: "100%", sm: "100%", md: "60%" } }}>
        <NotificationHistory  notificationcondition={notificationcondition}/>
      </Box>
    </Box>
  );
};

export default Notification;
