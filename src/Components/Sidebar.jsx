import { Box, Button, Drawer, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logoimg from "../Assets/logoimg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarcontent } from "./Data";
import Logout from "../Assets/Logo/Logout.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Admin_Logout } from "../ReduxToolkit/Slices/AuthSlice/Auth.action";
import MenuIcon from "@mui/icons-material/Menu";
const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScreen, setisScreen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  let location = useLocation().pathname;
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleResize = () => {
    if (window.innerWidth <= 900) {
      setSidebarOpen(true);
      setisScreen(true);
    } else {
      setSidebarOpen(false);
      setisScreen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSidebarOpen(inOpen);
  };

  const handleTabHover = (index) => {
    setActiveTab(index);
  };
  const handleTabLeave = () => {
    setActiveTab(null);
  };
  // ------ logout Popup ---------

  let HandeldLogout = () => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout !",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Logged out",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(Admin_Logout());
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    });
  };
  return (
    <>
      <Drawer open={isSidebarOpen} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              background: "rgba(239, 250, 255, 1)",
              width: "100%",
              height: "95vh",
              display: "flex",
              flexDirection: "column",
              transition: "width 0.3s ease",
              padding: "20px 0px",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                width: "100%",
                color: "#fff",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                mb: "15px",
              }}
            >
              <Box sx={{ width: "114px", height: "113px" }}>
                <img
                  src={logoimg}
                  style={{ width: "100%", height: "100%" }}
                  alt="logoimg"
                />
              </Box>
            </Box>
            <Box
              sx={{
                height: "90%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              {sidebarcontent.map((tab, index) => (
                <Link
                  key={index}
                  to={tab?.location}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      width: "100%",
                      border: "0.5px solid transparent",
                      cursor: "pointer",
                      display: "flex",
                      padding: "0px 10px",
                      color: "#000",
                      boxSizing: "border-box",
                    }}
                    onMouseEnter={() => handleTabHover(index)}
                    onMouseLeave={handleTabLeave}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        borderRadius: "10px",
                        padding: "15px 30px",
                        width: "100%",
                        height: "100%",
                        m: "auto",
                        display: "flex",
                        border: "1px solid transparent",
                        background:
                        location === tab.location ||
                        (location == "/" && tab.location == "/") ||
                        (location == "/content-management/prompts" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/language" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/religion" &&
                          tab.location == "/content-management") ||
                        (location == "/report-user/user-details" &&
                          tab.location == "/report-user") ||
                        (location == "/setting/terms&conditions" &&
                          tab.location == "/setting") ||
                        (location == "/setting/privacy&policy" &&
                          tab.location == "/setting")
                            ? "rgba(64, 196, 255, 1)"
                            : "",
                        color:
                        location === tab.location ||
                        (location == "/" && tab.location == "/") ||
                        (location == "/content-management/prompts" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/language" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/religion" &&
                          tab.location == "/content-management") ||
                        (location == "/report-user/user-details" &&
                          tab.location == "/report-user") ||
                        (location == "/setting/terms&conditions" &&
                          tab.location == "/setting") ||
                        (location == "/setting/privacy&policy" &&
                          tab.location == "/setting")
                            ? "#000"
                            : "rgba(115, 115, 115, 1)",
                        transition: "border 0.2s ease,",
                        "&:hover": {
                          border: "1px solid rgba(64, 196, 255, 1)",
                        },
                      }}
                    >
                      <Box sx={{ width: "24px", height: "24px" }}>
                        <img
                          src={
                            location === tab.location ||
                            (location == "/" && tab.location == "/") ||
                            (location == "/content-management/prompts" &&
                              tab.location == "/content-management") ||
                            (location == "/content-management/language" &&
                              tab.location == "/content-management") ||
                            (location == "/content-management/religion" &&
                              tab.location == "/content-management") ||
                            (location == "/report-user/user-details" &&
                              tab.location == "/report-user") ||
                            (location == "/setting/terms&conditions" &&
                              tab.location == "/setting") ||
                            (location == "/setting/privacy&policy" &&
                              tab.location == "/setting")
                              ? tab.Activelogo
                              : tab.logo
                          }
                          style={{ width: "100%", height: "100%" }}
                          alt="logos"
                        />
                      </Box>
                      <Typography
                        sx={{
                          lineHeight: "120%",
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        {tab.Title}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                width: "100%",
                border: "0.5px solid transparent",
                cursor: "pointer",
                display: "flex",
                padding: "0px 10px",
                color: "#000",
                boxSizing: "border-box",
                background: "#EFFAFF",
              }}
            >
              <Box
                onClick={() => HandeldLogout()}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  borderRadius: "10px",
                  padding: "15px 40px",
                  width: "100%",
                  height: "100%",
                  m: "auto",
                  border: "1px solid transparent",
                  background: "rgba(239, 250, 255, 1)",
                  color: "rgba(115, 115, 115, 1)",
                  transition: "background 0.2s ease , color 0.2s ease,",
                  "&:hover": {
                    color: "#000",
                    background: "rgba(64, 196, 255, 1)",
                  },
                }}
              >
                <Box sx={{ width: "24px", height: "24px" }}>
                  <img
                    src={Logout}
                    style={{ width: "100%", height: "100%" }}
                    alt="logos"
                  />
                </Box>
                <Typography
                  sx={{
                    lineHeight: "120%",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  Logout
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>
      {isScreen && !isSidebarOpen ? (
        <MenuIcon
          onClick={() => setSidebarOpen(true)}
          sx={{
            display: "inline",
            width: "40px",
            height: "30px",
            position: "absolute",
            right: "10px",
            top: "20px",
            borderRadius: "10px",
            background: "rgba(64, 196, 255, 1)",
            color: "#fff",
          }}
        />
      ) : (
        ""
      )}
      {!isScreen ? (
        <Box
          sx={{
            background: "rgba(239, 250, 255, 1)",
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.3s ease",
            padding: "20px 0px",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              width: "100%",
              color: "#fff",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              mb: "15px",
            }}
          >
            <Box sx={{ width: "114px", height: "113px" }}>
              <img
                src={logoimg}
                style={{ width: "100%", height: "100%" }}
                alt="logoimg"
              />
            </Box>
          </Box>
          <Box
            sx={{
              height: "90%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {sidebarcontent.map((tab, index) => (
              <Link
                key={index}
                to={tab?.location}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    width: "100%",

                    border: "0.5px solid transparent",
                    cursor: "pointer",
                    display: isScreen ? "none" : "flex",
                    padding: "0px 10px",
                    color: "#000",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={() => handleTabHover(index)}
                  onMouseLeave={handleTabLeave}
                >
                  <Box
                    sx={{
                      alignItems: "center",
                      gap: "10px",
                      borderRadius: "10px",
                      padding: "15px 30px",
                      width: "100%",
                      height: "100%",
                      m: "auto",
                      display: isScreen ? "none" : "flex",
                      border: "1px solid transparent",
                      background:
                        location === tab.location ||
                        (location == "/" && tab.location == "/") ||
                        (location == "/content-management/prompts" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/language" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/religion" &&
                          tab.location == "/content-management") ||
                        (location == "/report-user/user-details" &&
                          tab.location == "/report-user") ||
                        (location == "/setting/terms&conditions" &&
                          tab.location == "/setting") ||
                        (location == "/setting/privacy&policy" &&
                          tab.location == "/setting")
                          ? "rgba(64, 196, 255, 1)"
                          : "",
                      color:
                        location === tab.location ||
                        (location == "/" && tab.location == "/") ||
                        (location == "/content-management/prompts" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/language" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/religion" &&
                          tab.location == "/content-management") ||
                        (location == "/report-user/user-details" &&
                          tab.location == "/report-user") ||
                        (location == "/setting/terms&conditions" &&
                          tab.location == "/setting") ||
                        (location == "/setting/privacy&policy" &&
                          tab.location == "/setting")
                          ? "#000"
                          : "rgba(115, 115, 115, 1)",
                      transition: "border 0.2s ease,",
                      "&:hover": {
                        border: "1px solid rgba(64, 196, 255, 1)",
                      },
                    }}
                  >
                    <Box sx={{ width: "24px", height: "24px" }}>
                      <img
                        src={
                          location === tab.location ||
                        (location == "/" && tab.location == "/") ||
                        (location == "/content-management/prompts" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/language" &&
                          tab.location == "/content-management") ||
                        (location == "/content-management/religion" &&
                          tab.location == "/content-management") ||
                        (location == "/report-user/user-details" &&
                          tab.location == "/report-user") ||
                        (location == "/setting/terms&conditions" &&
                          tab.location == "/setting") ||
                        (location == "/setting/privacy&policy" &&
                          tab.location == "/setting")
                            ? tab.Activelogo
                            : tab.logo
                        }
                        style={{ width: "100%", height: "100%" }}
                        alt="logos"
                      />
                    </Box>
                    <Typography
                      sx={{
                        lineHeight: "120%",
                        fontWeight: "600",
                        fontSize: { xs: "12px", md: "15px" },
                      }}
                    >
                      {tab.Title}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              width: "100%",
              border: "0.5px solid transparent",
              cursor: "pointer",
              display: isSidebarOpen ? "none" : "flex",
              padding: "0px 10px",
              color: "#000",
              boxSizing: "border-box",
              background: "#EFFAFF",
            }}
          >
            <Box
              onClick={() => HandeldLogout()}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                borderRadius: "10px",
                padding: "15px 40px",
                width: "100%",
                height: "100%",
                m: "auto",
                border: "1px solid transparent",
                background: "rgba(239, 250, 255, 1)",
                color: "rgba(115, 115, 115, 1)",
                transition: "background 0.2s ease , color 0.2s ease,",
                "&:hover": {
                  color: "#000",
                  background: "rgba(64, 196, 255, 1)",
                },
              }}
            >
              <Box sx={{ width: "24px", height: "24px" }}>
                <img
                  src={Logout}
                  style={{ width: "100%", height: "100%" }}
                  alt="logos"
                />
              </Box>
              <Typography
                sx={{
                  lineHeight: "120%",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        " "
      )}
    </>
  );
};

export default Sidebar;
