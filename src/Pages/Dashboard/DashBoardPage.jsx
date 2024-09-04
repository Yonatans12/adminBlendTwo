import { Box } from "@mui/material";
import React from "react";
import Sidebar from "../../Components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const DashBoardPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  // const navigate = useNavigate()
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box
          sx={{
            display:
              currentPath.startsWith(`/dashboard/user/`) ||
              currentPath.startsWith(`/dashboard/resources/blogs/addblogs`)
                ? "none"
                : "block",
            width: { xs: "0%", md: "20%" },
          }}
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            padding: " 5px 30px",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashBoardPage;
