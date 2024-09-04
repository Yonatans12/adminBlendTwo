import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const CustomLoaderButton = (props) => {
  const {
    btn_title,
    type,
    disabled,
    loading,
    onClick,
    btnheight,
    bgcolor,
    color,width
  } = props;

  return (
    <Button
      variant="contained"
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      sx={{
        background: bgcolor?bgcolor:`radial-gradient(109.7% 73.34% at 20.3% 40.91%, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, #40C4FF 0%, #1BB9FF 100%);`,
        maxWidth: "354px",
        width: width?width:"100%",
        color: "#000000",
        fontWeight: "500",
        fontSize: "16px",
        textTransform: "capitalize",
        height: btnheight ? btnheight : "45px",
        borderRadius: "10px",
        color:color?color: "#000",
      }}
      fullWidth
    >
      {loading ? (
        <>
          <CircularProgress size={24} color="inherit" />
        </>
      ) : (
        btn_title
      )}
      
    </Button>
  );
};

export default CustomLoaderButton;
