import React, { useEffect } from "react";
import PageTitle from "../../Components/PageTitle";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { GetPrivacyandTermsConditiondata } from "../../ReduxToolkit/Slices/ContentManagment/ContentManage.action";
import { useDispatch, useSelector } from "react-redux";
const ContentManagement = () => {
  let links = [
    { id: 1, name: "Interest", path: "/content-management" },
    { id: 2, name: "Prompts", path: "/content-management/prompts" },
    { id: 1, name: "Language", path: "/content-management/language" },
    { id: 2, name: "Religion", path: "/content-management/religion" },
  
  ];
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <PageTitle Title={"Content Management"} />

      <Box sx={{ display: "flex", gap: "20px",padding:"10px 0px 20px 0px" }}>
            {links?.map((li, i) => (
              <Box>
                <Link to={li.path} style={{ textDecoration: "none" }}>
                  <Typography
                    // onClick={() => setselectedtab(i + 1)}
                    sx={{
                      
                      cursor: "pointer",
                      position: "relative",
                      textDecoration: "none",
                      fontWeight:"600",
                      fontSize:{xs:"12px",sm:"18px"},
                      borderBottom:
                        currentPath == li?.path
                          ? "3px solid #40C4FF"
                          : "3px solid transparent",
                      color: currentPath == li?.path ? "#40C4FF" : "gray",
                      "&:hover": {
                      
                        textDecoration: "none", // Remove the default underline
                        borderBottom: "3px solid #40C4FF", // Add the color as an underline
                        transition: "border-bottom 0.2s ease-in-out", // Add transition for the border-bottom
                      },
                    }}
                  >
                    {li?.name}
                  </Typography>
                </Link>
              </Box>
            ))}
          </Box>



      <Outlet/>

    </>
  );
};

export default ContentManagement;
