import React, { useEffect, useState } from "react";
import DisplayMessage from "../../../Components/DisplayMessage";
import PageTitle from "../../../Components/PageTitle";
import { DataGrid } from "@mui/x-data-grid";
import { TablePagination } from "@mui/material";

import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  BlockUnblock_Users,
  Get_Reported_Users,
} from "../../../ReduxToolkit/Slices/UserSlice/User.action";
import blockemailicon from "../../../Assets/Logo/BlockEmail.png";
import Unblockemailicon from "../../../Assets/Logo/Unblocklogo.png";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ViewUserDetailsicon from "../../../Assets/Logo/ViewLogo.png";
import { useNavigate } from "react-router-dom";
import { GridActionsCellItem } from "@mui/x-data-grid";

const ReportUser = () => {
  // const columns = [
  //   { id: "#", label: "#" },
  //   { id: "Reported User", label: "Reported User" },
  //   { id: "Reported Count", label: "Reported Count" },
  //   { id: "Email", label: "Email" },
  //   { id: "Action", label: "Action" },
  // ];

  const columns = [
    {
      field: "rowid",
      headerName: "#",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 80,
      disableColumnMenu: true,
    },
    {
      field: "reportedusername",
      headerName: "Reported User",
      headerAlign: "center",
      align: "center",
      flex: 2,
      minWidth: 80,
      disableColumnMenu: true,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={
            <Typography
              noWrap
              sx={{
                color: "#000",
                textOverflow: "ellipsis",
                fontSize: "14px",
                textalign: "center",
              }}
            >
              {params?.row?.reportedusername
                ? params?.row?.reportedusername
                : "--- "}
            </Typography>
          }
        />
      ),
    },
    {
      field: "report_count",
      headerName: "Reported Count",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
      minWidth: 80,
      disableColumnMenu: true,
    },
    {
      headerName: "Email",
      field: "email",
      headerAlign: "center",
      align: "center",
      flex: 3.5,
      minWidth: 150,
      disableColumnMenu: true,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={
            <Typography
              noWrap
              sx={{
                color: "#000",
                textOverflow: "ellipsis",
                fontSize: "14px",
                textalign: "center",
              }}
            >
              {params?.row?.email ? params?.row?.email : "--- "}
            </Typography>
          }
        />
      ),
    },
    {
      headerName: "Account Status",
      field: "Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 120,
      disableColumnMenu: true,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={
            <Typography
              noWrap
              sx={{
                color: "#000",
                textOverflow: "ellipsis",
                fontSize: "14px",
                textalign: "center",
              }}
            >
              <Chip
                label={
                  params?.row?.is_banned == 0
                    ? "Pending"
                    : params?.row?.is_banned == 1
                    ? "Blocked"
                    : "Unblocked"
                }
                color={
                  params?.row?.is_banned == 0
                    ? "primary"
                    : params?.row?.is_banned == 1
                    ? "error"
                    : "success"
                }
              />
              {/* { params?.row?.is_banned==0? "Pending":params?.row?.is_banned===1?"Banned":"Unbanned"  } */}
            </Typography>
          }
        />
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      minWidth: 100,
      disableColumnMenu: true,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                gap: "10px",
              }}
            >
              {params?.row?.is_banned === 2 ? (
                ""
              ) : (
                <img
                  onClick={() => ViewReportedUserDetails(params?.row)}
                  style={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                  src={ViewUserDetailsicon}
                  alt=""
                />
              )}
            </Box>
          }
        />
      ),
    },
  ];
  let dispatch = useDispatch();
  const [page, setPage] = useState(0);
  let navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(Get_Reported_Users(newPage * 10));
  };

  useEffect(() => {
    dispatch(Get_Reported_Users(page * 10));
  }, []);

  let blockUseremail = (id, reason) => {
    let DisplayData = `Reason : ${reason} `;
    Swal.fire({
      title: "Are you sure want to Block this user ?",
      text: DisplayData,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#40C4FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed === true) {
        let formdata = new FormData();
        formdata.append("blocked_user_id", id);
        formdata.append("type", 2);

        dispatch(BlockUnblock_Users(formdata))
          .unwrap()
          .then((result) => {
            if (result?.s === 1) {
              toast(result?.m, {
                icon: "👏",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
              dispatch(Get_Reported_Users(page * 10));
            }
          });
      }
    });
  };
  let ReportedUserData = useSelector((store) => store?.Users);

  let ViewReportedUserDetails = (userData) => {
    navigate("/report-user/user-details", { state: { userInfo: userData } });
  };

  let Rowdata = ReportedUserData?.ReportedUser?.r?.map((data, i) => ({
    rowid: i + 1 + page * 10,
    email: data?.report_to?.email,
    reportedusername: data?.report_to?.name,

    ...data,
  }));
  return (
    <div>
      <PageTitle Title={"Report User"} />

      <DataGrid
        rows={Rowdata || []}
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
          height: "82vh",
        }}
      />

      <TablePagination
        sx={{ mt: "10px" }}
        component="div"
        count={ReportedUserData?.ReportedUser?.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
      />
    </div>
  );
};

export default ReportUser;
