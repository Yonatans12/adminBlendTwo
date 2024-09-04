import { Box, Modal } from "@mui/material";
import React from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  p: 4,
  borderRadius:"20px"

};

export const CustomModal = (props) => {
  let { open, handleCloseModal, children } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
