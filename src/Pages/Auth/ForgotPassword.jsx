import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import CustomLoaderButton from "../../Components/CustomLoaderButton";
import bgimage from "../../Assets/BgImage.png";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../Firebase/firebaseConfig";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const CustomAlert = (message, type) => {
    Swal.fire({
      position: "top-center",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "", 
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter valid email address")
        .required("Email address is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (isLoading) {
        return;
      } else {
        try {
          setIsLoading(true);
          const auth = getAuth(app);
          await sendPasswordResetEmail(auth, values.email);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Password reset email sent successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
        } catch (error) {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Error sending password reset email",
            showConfirmButton: false,
            timer: 1500,
          });
          console.error("Error sending password reset email:", error);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#40C4FF",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bgimage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            background: "#FFFFFF",
            boxShadow: "0px 4px 107px 0px #0000000D",
            padding: "40px 60px",
            borderRadius: "30px",
            maxWidth: { xs: "", md: "450px", lg: "662px" },
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "42px",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            Forgot Password?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              color: "#000000B2",
              textAlign: "justify",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
            dolorol egestas morbi sem vulputate etiam facilisis pellentesque ut
            quis.
          </Typography>
          <Box
            sx={{
              padding: "30px 0px 0px 0px",
              boxSizing: "border-box",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
                return false;
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <label
                    htmlFor="email"
                    style={{
                      fontSize: "15px",
                      color: "#000000",
                      fontWeight: "400",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => {
                      const { value } = e.target;
                      if (value.trimStart() !== value) {
                        e.target.value = value.trimStart();
                      }
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onKeyUp={formik.handleBlur}
                    autoComplete="off"
                    invalid={
                      formik.touched.email && formik.errors.email ? true : false
                    }
                    style={{
                      padding: "16px 40px 16px 15px",
                      border: `1.5px solid ${
                        formik.touched.email && formik.errors.email
                          ? "#dc3545"
                          : "#40C4FF"
                      }`,
                      borderRadius: "10px",
                      width: "100%",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "24px",
                      margin: "10px 0px 0px 0px",
                      boxSizing: "border-box",
                      background: "rgba(64, 196, 255, 0.1)",
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      "&.is-invalid": {
                        border: "1.5px solid #dc3545",
                      },
                    }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px 0px 0px 10px",
                      }}
                      type="invalid"
                    >
                      {formik.errors.email}
                    </Typography>
                  ) : null}
                </Grid>

                <Grid
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  item
                  xs={12}
                >
                  <NavLink   style={{textDecoration:"none",color:"#000",fontWeight:"500"}} to={"/login"} onClick={() => navigate("/login")}>
                    Back to login !
                  </NavLink>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CustomLoaderButton
                      type="submit"
                      btnheight={"60px"}
                      btn_title="Send"
                      loading={isLoading}
                      disabled={!(formik.dirty && formik.isValid)}
                    />
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
