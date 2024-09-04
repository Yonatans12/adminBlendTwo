import React, { useEffect, useState } from "react";
import PageTitle from "../../../Components/PageTitle";
import logoimage from "../../../Assets/logoimg.png";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BlockUnblock_Users,
  Get_Reportedby_UserDetails,
} from "../../../ReduxToolkit/Slices/UserSlice/User.action";
import { BaseUrl } from "../../../ReduxToolkit/Api";
import blockemailicon from "../../../Assets/Logo/BlockEmail.png";
import Unblockemailicon from "../../../Assets/Logo/Unblocklogo.png";
import Dummyimage from "../../../Assets/UserDummyImage.png";
import CustomLoaderButton from "../../../Components/CustomLoaderButton";
import { CustomModal } from "../../../Components/CustomModal";
import toast from "react-hot-toast";
import { Formik } from "formik";
const ReportUserDetails = () => {
  const columns = [
    { id: "#", label: "#" },
    { id: "Name", label: "Name" },
    { id: "Email", label: "Email" },
    { id: "Reason", label: "Reason" },
    { id: "Description", label: "Description" },
  ];

  let commonstyle = {
    fontSize: "16px",
    fontWeight: "600",
  };
  const { state } = useLocation();
  let dispatch = useDispatch();
  let userdetails = useSelector((store) => store?.Users);
  const [page, setPage] = useState(0);
  let navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(
      Get_Reportedby_UserDetails({
        userid: state?.userInfo?.reported_user_id,
        count: newPage * 10,
      })
    );
  };
  useEffect(() => {
    dispatch(
      Get_Reportedby_UserDetails({
        userid: state?.userInfo?.reported_user_id,
        count: page * 10,
      })
    );
  }, [dispatch]);

  let navigatetoback = () => {
    navigate("/report-user");
  };

  let [isblockusermodalopen, setblockusermodalopen] = useState(false);
  let [blockuserReason, setblockuserReason] = useState("");
  let [loader, setloader] = useState(false);
  let handeldBlockunblock = (actiontype) => {
    // --- Add Edit Category ------
    let formdata = new FormData();
    if (actiontype == "block" && !blockuserReason?.trim()) {
      toast.error("Please enter a reason to block this user !");
      return;
    }
    if (actiontype == "block") {
      formdata.append("reason", blockuserReason);
    }
    formdata.append("reported_user_id", state?.userInfo?.reported_user_id);
    formdata.append("is_banned", actiontype == "block" ? 1 : 2);
    setloader(true);
    dispatch(BlockUnblock_Users(formdata))
      .unwrap()
      .then((result) => {
        if (result?.s === 1) {
          setloader(false);
          toast(
            `User ${
              actiontype == "block" ? "Blocked" : "Unblocked"
            } Sucessfully`,
            {
              icon: "👏",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }
          );
          navigate("/report-user");
          setloader(false);
          setblockusermodalopen(false);
        } else {
          toast.error("something wents wrong please try again !");
          setloader(false);
        }
      });
  };

  let handeldBlockReasoninput = (e) => {
    setblockuserReason(e.target.value);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Box
          onClick={navigatetoback}
          sx={{
            cursor: "pointer",
            border: "1px solid rgba(64, 196, 255, 1)",
            padding: "2px 5px 0px 10px",
            borderRadius: "5px",
            color:"#fff",
            backgroundColor: "rgba(64, 196, 255, 1)",
            transition: "color 0.3s ease", // Adding transition effect
            "&:hover": {
              backgroundColor: "rgba(64, 196, 255, 1)",
              color:"#000",
            },
          }}
        >
          <ArrowBackIosIcon sx={{ width: "20px", height: "20px" }} />
        </Box>
        <PageTitle Title={"Report User / Details"} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",

          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            border: "0.5px solid rgba(64, 196, 255, 1)",
            gap: "10%",
            alignItems: "center",
            padding: "20px",
            borderRadius: "20px",
             flexWrap:"wrap",
             justifyContent:{xs:"center",sm:"start"},
       
          }}
        >
          <Box>
            <img
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                border: "0.5px solid rgba(64, 196, 255, 1)",
              }}
              src={
                state?.userInfo?.report_to?.user_img[0]?.img_name
                  ? `${BaseUrl}/${state?.userInfo?.report_to?.user_img[0]?.img_name}`
                  : Dummyimage
              }
              alt="logoimage"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography>
              <span style={{ ...commonstyle }}> Name :</span>{" "}
              {state?.userInfo?.report_to?.name}
            </Typography>
            <Typography>
              <span style={{ ...commonstyle }}>Email : </span>{" "}
              {state?.userInfo?.report_to?.email}
            </Typography>

            <Typography>
              <span style={{ ...commonstyle }}>Report by : </span>{" "}
              {state?.userInfo?.report_count} Users
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              alignItems: "start",
              flexDirection: "column",
              mt:"20px"
            }}
          >
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <span style={{ ...commonstyle }}>Acccount Status : </span>

              <Chip
                label={
                  state?.userInfo?.is_banned == 0
                    ? "Pending"
                    : state?.userInfo?.is_banned == 1
                    ? "Blocked"
                    : "Unblocked"
                }
                color={
                  state?.userInfo?.is_banned == 0
                    ? "primary"
                    : state?.userInfo?.is_banned == 1
                    ? "error"
                    : "success"
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <span
                style={{
                  ...commonstyle,
                  textAlign: "start",
                }}
              >
                Action :
              </span>

              <img
                onClick={() => setblockusermodalopen(true)}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                }}
                src={
                  state?.userInfo?.is_banned == 1
                    ? Unblockemailicon
                    : blockemailicon
                }
                // Unblockemailicon
                alt=""
              />

              {/* <Button sx={{  }}>{ state?.userInfo?.is_banned == 0
                    ? "Pending"
                    : state?.userInfo?.is_banned == 1
                    ? "Banned"
                    : "Unbanned"}</Button> */}
            </Box>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "20px", fontWeight: "550" }}>
          Reported By{" "}
        </Typography>

        <Paper style={{ width: "100%", overflow: "hidden" }}>
          <TableContainer style={{ height: "35.5vh" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        textAlign: "center",
                        fontSize: "15px",
                        lineHeight: "120%",
                        fontWeight: "600",
                        background: "#40C4FF",
                        color: "#000",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ textAlign: "center" }}>
                {userdetails?.ReportedbyUsers?.r?.map((row, i) => (
                  <TableRow
                    key={row.id}
                    sx={{ textAlign: "center", width: "100%" }}
                  >
                    <TableCell
                      sx={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        width: "20%",
                        fontWeight: "600",
                      }}
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        width: "20%",
                        fontWeight: "600",
                      }}
                    >
                      {row?.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        width: "25%",
                        fontWeight: "600",
                      }}
                    >
                      {row?.reason}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        width: "25%",
                        fontWeight: "600",
                      }}
                    >
                      {row?.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <TablePagination
        sx={{ mt: "-10px" }}
        component="div"
        count={userdetails?.ReportedbyUsers?.count || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
      />

      {/* ----------------------- Add Interest Modal ----------------------- */}

      <CustomModal
        open={isblockusermodalopen}
        handleCloseModal={() => setblockusermodalopen(false)}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography>
            Are you sure you want to{" "}
            {state?.userInfo?.is_banned == 1 ? "Unblock" : "Block"} this User ?
          </Typography>
          {state?.userInfo?.is_banned == 1 ? (
            <Box></Box>
          ) : (
            <textarea
              className="form-control"
              placeholder="Enter Reason"
              name="email"
              onChange={handeldBlockReasoninput}
              value={blockuserReason?.trimStart()}
              autoComplete="off"
              style={{
                padding: "10px 40px 10px 15px",
                border: " 1.5px solid  #40C4FF",
                borderRadius: "10px",
                width: "100%",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
                boxSizing: "border-box",
                background: "rgba(64, 196, 255, 0.1)",
                resize: "none", 
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
                "&.is-invalid": {
                  border: "1.5px solid #dc3545",
                },
              }}
            />
          )}

          <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <CustomLoaderButton
              onClick={() =>
                handeldBlockunblock(
                  state?.userInfo?.is_banned == 1 ? "unblock" : "block"
                )
              }
              disabled={loader}
              btn_title="Yes"
              type="submit"
              width="40%"
              loading={loader}
            />

            <CustomLoaderButton
              onClick={() => setblockusermodalopen(false)}
              // disabled={addintrestloader}
              btn_title="Cancel"
              type="submit"
              bgcolor="rgba(204, 51, 0, 1)"
              color="#fff"
              width="40%"
              // loading={addintrestloader}
            />
          </Box>
        </Box>
      </CustomModal>
    </div>
  );
};

export default ReportUserDetails;
