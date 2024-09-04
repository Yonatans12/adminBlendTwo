import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import PageTitle from "../../Components/PageTitle";
import { Chip, TablePagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Get_AllUsers } from "../../ReduxToolkit/Slices/UserSlice/User.action";
import { BaseUrl } from "../../ReduxToolkit/Api";
import DummyProfile from "../../Assets/UserDummyImage.png";
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
          width="30px"
          height={"30px"}
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
        {params?.row?.email ? params?.row?.email : "--- "}
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
        }}
      >
        {/* {params?.row?.email ? params?.row?.email : "---"} */}
        {params?.row.phno === null
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

const Users = () => {
  
  const dispatch = useDispatch()

  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(Get_AllUsers(newPage * 10));
  }

  useEffect(() => {
    dispatch(Get_AllUsers(page * 10));
  }, [])

  let Data = useSelector((Store) => Store?.Users)

  let Rowdata = Data?.AllUsers?.r?.map((data, i) => ({
    rowid: i + 1+page * 10,
    ...data,
  }))


  return (
    <>
      <PageTitle Title={"Users Managment"} />
      <Box sx={{ height:{xs:"80vh",sm:590}, width: "100%" }}>
        <DataGrid
          rows={Rowdata || []}
          columns={columns}
          disableSelectionOnClick
          disableRowSelectionOnClick
          editMode="false"
          loading={Data?.loading}
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
 
        <TablePagination
          sx={{ mb: "-20px" }}
          component="div"
          count={Data.AllUsers?.count || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      </Box>
    </>
  );
};

export default Users;
