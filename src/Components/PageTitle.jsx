import { Box, Typography } from "@mui/material";
import React from "react";

const PageTitle = ({ Title }) => {
  return (
    <>
      <Box sx={{ padding: "10px 0px" }}>
        <Typography sx={{ fontSize: "25px" }}>{Title}</Typography>
      </Box>
    </>
  );
};

export default PageTitle;
