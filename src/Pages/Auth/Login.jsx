import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import CustomLoaderButton from "../../Components/CustomLoaderButton";
import bgimage from "../../Assets/BgImage.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { Admin_Login } from "../../ReduxToolkit/Slices/AuthSlice/Auth.action";
import { setAuthData } from "../../ReduxToolkit/Api";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = () => {
  const CustomAlert = (message, type, subtext) => {
    Swal.fire({
      position: "top-center",
      icon: type,
      title: message,
      text: subtext,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      address: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please Enter valid email address")
        .required("Email address is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^().{6,20}$/,
          "Password should contain at least one capital letter and be between 6 and 20 characters"
        ),
    }),
    onSubmit: async (values) => {
      if (isLoading) {
        return;
      } else {
        try {
          setIsLoading(true);
          const auth = getAuth(app);
          await signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              const user = userCredential.user;
              let logindata = new FormData();
              logindata?.append("fb_token", user?.uid);
              logindata?.append("login_type", 1);
              dispatch(Admin_Login(logindata))
                .unwrap()
                .then((result) => {
                  if (result?.s === 1) {
                    setAuthData(result?.r);
                    setIsLoading(false);
                    CustomAlert(
                      "Login Success ",
                      "success",
                      "Welcome to Blend2Admin !"
                    );
                    setTimeout(() => {
                      Navigate("/");
                      window.location.reload(false);
                    }, 1000);
                  } else {
                    setIsLoading(false);
                    CustomAlert("Login Faild!", "error");
                  }
                });
            })
            .catch((error) => {
              setIsLoading(false);
              CustomAlert(
                error?.code === "auth/invalid-credential" ||
                  "auth/wrong-password"
                  ? "Invalid Login Credentials"
                  : error?.message,
                "error"
              );
            });
        } catch (error) {
          setIsLoading(false);
          console.error("Error logging in:", error);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#40C4FF",
        height: "100vh",
        opacity: "10000000.98",
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
            padding: { xs: "20px 30px", md: "40px 60px" },
            borderRadius: "30px",
            maxWidth: { xs: "320px", md: "622px" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "30px", lg: "35px", xl: "42px" },
              fontWeight: "600",
              color: "#000000",
            }}
          >
            Welcome back!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
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
              <Grid container spacing={2}>
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
                      "::placeholder": {
                        color: "red", // Placeholder color set to red
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
                <Grid item xs={12}>
                  <label
                    htmlFor="password"
                    style={{
                      fontSize: "15px",
                      color: "#000000",
                      fontWeight: "400",
                    }}
                  >
                    Password
                  </label>

                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value.trimStart() !== value) {
                          e.target.value = value.trimStart();
                        }
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      onKeyUp={formik.handleBlur}
                      autoComplete="off"
                      invalid={
                        formik.touched.password && formik.errors.password
                      }
                      style={{
                        padding: "16px 40px 16px 15px",
                        border: `1.5px solid ${
                          formik.touched.password && formik.errors.password
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
                        position: "relative",
                      }}
                    />
                    <span
                      onClick={handleTogglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "20px",
                        top: "40%",
                        // transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </span>
                  </div>

                  {formik.touched.password && formik.errors.password ? (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "red",
                        fontSize: "14px",
                        padding: "3px 0px 0px 10px",
                      }}
                      type="invalid"
                    >
                      {formik.errors.password}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  item
                  xs={12}
                >
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "#000",
                      fontWeight: "500",
                    }}
                    to={"/forgotpassword"}
                    onClick={() => navigate("/forgotpassword")}
                  >
                    Forgot Password ?
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
                      btn_title="Login"
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

export default Login;
