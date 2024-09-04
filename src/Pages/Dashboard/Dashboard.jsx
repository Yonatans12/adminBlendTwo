import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  TablePagination,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import totalusericon from "../../Assets/Logo/totalusers.png";
import primiumusericon from "../../Assets/Logo/priemiumuser.png";
import freeusericon from "../../Assets/Logo/freeusers.png";
import PageTitle from "../../Components/PageTitle";
import DashboardChart from "../../Components/DashboardChart";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

import {
  Get_RecentUsers,
  Get_UsersData,
} from "../../ReduxToolkit/Slices/UserSlice/User.action";
import { BaseUrl } from "../../ReduxToolkit/Api";
import DummyProfile from "../../Assets/UserDummyImage.png";
import { GetDashAnalyticsdata } from "../../ReduxToolkit/Slices/Dashboard/Dashboard.action";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    field: "rowid",
    headerName: "#",
    headerAlign: "center",
    align: "center",
    flex: 0.2,
    minWidth: 80,
    disableColumnMenu: true,
  },
  {
    headerName: "Profile Photo",
    field: "profilephoto",
    headerAlign: "center",
    align: "center",
    flex: 0.8,
    minWidth: 150,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "8px",
        }}
      >
        <img
          style={{ cursor: "pointer" }}
          alt="profile"
          src={
            params?.row?.userImg[0]?.img_name
              ? ` ${BaseUrl}/${params?.row?.userImg[0]?.img_name}`
              : DummyProfile
          }
          width="35px"
          height={"35px"}
        />
      </Box>
    ),
  },
  {
    field: "username",
    headerName: "Full Name",
    headerAlign: "center",
    align: "center",
    height: "100%",
    flex: 1.2,
    minWidth: 200,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Typography
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "14px",
          textalign: "center",
          // texttransform:"lowercase"
        }}
      >
        {params?.row?.username ? params?.row?.username : "---"}
      </Typography>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1.5,
    minWidth: 210,
    headerAlign: "center",
    align: "center",
    disableColumnMenu: true,
    renderCell: (params) => (
      <Typography
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "14px",
          textalign: "center",
          textTransform: "lowercase",
        }}
      >
        {params?.row?.email ? params?.row?.email : "---"}
      </Typography>
    ),
  },
  {
    field: "phno_cc",
    headerName: "Mobile Number",
    flex: 1,
    minWidth: 210,
    headerAlign: "center",
    align: "center",
    disableColumnMenu: true,
    renderCell: (params) => (
      <Typography
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "14px",
          textalign: "center",
          textTransform: "lowercase",
          fontWeight: "500",
        }}
      >
        {params?.row.phno === null || params?.row.phno === ""
          ? "--- "
          : params?.row.phno_cc + " " + params?.row.phno}
      </Typography>
    ),
  },

  {
    field: "premium",
    headerName: "Premium",
    sortable: false,
    editable: false,
    minWidth: 200,
    disableColumnMenu: true,
    flex: 0.8,
    headerAlign: "center",
    align: "center", // Adjusted alignment to center
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%", // Ensure the parent div fills the entire cell height
          textAlign: "center", // Corrected typo from textalign to textAlign
        }}
      >
        <Chip
          sx={{ width: "100px" }}
          label={params?.row?.premium === 0 ? "Free" : "Premium"}
          color="primary"
          variant={params?.row?.premium == 0 ? "outlined" : ""}
        />
      </div>
    ),
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState(1); // Default to month
  const [chartData, setChartData] = useState();
  const handleChangeTimeRange = (event) => {
    setTimeRange(event.target.value);
  };
  const ViewAllUsers = () => {
    navigate("/users");
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Get_RecentUsers());
    getanaylytics(timeRange);
  }, [timeRange]);
  let [AnyalyticsData, setAnyalyticsData] = useState();
  const [Loading, setloading] = useState(true);
  const getanaylytics = async (timeRange) => {
    setloading(true);
    try {
      dispatch(GetDashAnalyticsdata(timeRange))
        .unwrap()
        .then((result) => {
          if (result?.s === 1) {
            setAnyalyticsData([
              {
                title: "Total Users",
                data: result?.r?.total_user,
                icon: totalusericon,
              },
              {
                title: "Premium User",
                data: result?.r?.premium_user,
                icon: primiumusericon,
              },
              {
                title: "Free User",
                data: result?.r?.free_user,
                icon: freeusericon,
              },
            ]);
            setChartData(result?.r?.chart);
          }
        });
    } catch {
      setloading(false);
    }
  };
  let Data = useSelector((Store) => Store);
  let Rowdata = Data?.Users?.RercentUsers?.map((data, i) => ({
    rowid: i + 1,
    ...data,
  }));
  return (
    <Box sx={{ height: "98vh", overflow: "auto" }}>
      <PageTitle Title={"Dashboard"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          justifyContent: "space-between",
        }}
      >
        <Grid sx={{ width: "100%", mb: "20px" }} container columnGap={2}>
          {AnyalyticsData?.map((el, i) => (
            <Grid
              key={i}
              sx={{
                background: "#EFFAFF",
                height: "100px",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                gap: { xs: "10px", sm: "10px" },
                alignItems: "center",
                width: { xs: "150px", sm: "200px" },
                mt: "10px",
              }}
              md={2.2}
              item
            >
              <Box
                sx={{
                  width: { xs: "40px", sm: "60px" },
                  height: { xs: "40px", sm: "60px" },
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={el?.icon}
                  alt=""
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: { xs: "16px", sm: "20px" },
                  }}
                >
                  {/* {el?.data}+ */}
                  <CountUp end={el?.data} />+
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  {el?.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: { xs: "-55px", sm: "-75px" },
            mr: { xs: "10px", sm: "30px" },
          }}
        >
          <Select
            value={timeRange}
            onChange={handleChangeTimeRange}
            sx={{
              // border: "1px solid rgba(70, 173, 242, 1)",
              outline: "none",
              width: { xs: "100px", sm: "140px",md:"240px" },
              textalign: "center",
              background: "#fff",
              height: "40px",
              outline: "none",
              border: "none",
              color: "black",
              fontSize: { xs: "12px", sm: "16px" },
            }}
          >
            <MenuItem value={1}>Week </MenuItem>
            <MenuItem value={2}> Month </MenuItem>
            <MenuItem value={3}> Year </MenuItem>
          </Select>
        </Box>

        <DashboardChart dashchartData={chartData} timeRange={timeRange} />
        {/* === Recent User Chart ======= */}
        <Box
          sx={{
            background: "#EFFAFF",
            padding: "20px 20px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: { xs: "16px", sm: "20px" }, fontWeight: "550" }}
            >
              Recent User
            </Typography>
            <Typography
              onClick={ViewAllUsers}
              sx={{
                fontSize: { xs: "14px", sm: "18px" },
                fontWeight: "550",
                cursor: "pointer",
                color: "rgba(64, 196, 255, 1)",
              }}
            >
              View all
            </Typography>
          </Box>
          <Box sx={{ height: "40vh", width: "100%" }}>
            <DataGrid
              rows={Rowdata}
              columns={columns}
              disableSelectionOnClick
              disableRowSelectionOnClick
              editMode="false"
              hideFooter
              sx={{
                border: "0px",
                borderRadius: "20px",
                boxShadow: 2,
                textTransform: "capitalize",
                color: "#000",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
