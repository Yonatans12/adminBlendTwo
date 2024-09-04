import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Box, Button } from "@mui/material";

import "react-quill/dist/quill.snow.css";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import {
  GetPrivacyandTermsConditiondata,
  UpadtePrivacyandTermsConditiondata,
} from "../../../ReduxToolkit/Slices/ContentManagment/ContentManage.action";

import "./loader.css";

const TermsandConditions = () => {
  let dispatch = useDispatch();
  let ContentData = useSelector((store) => store?.ContentManage);
  const [TermsAndcondition, SetTermsAndcondition] = useState("");
  let [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    dispatch(GetPrivacyandTermsConditiondata())
      .unwrap()
      .then((result) => {
        setloading(false);
        SetTermsAndcondition(result?.r?.terms_condition);
      });
  }, []);

  const handleUpdateTermscondition = () => {
    const processedContent = TermsAndcondition.replace(/<p>\s*<\/p>/g, "");
    const isEmptyContent =
      processedContent.trim() === "" || processedContent === "<p><br></p>";
    if (!isEmptyContent) {
      let TermsAndconditionformdata = new FormData();
      TermsAndconditionformdata.append("terms_condition", TermsAndcondition);
      setloading(true);
      dispatch(UpadtePrivacyandTermsConditiondata(TermsAndconditionformdata))
        .unwrap()
        .then((result) => {
          if (result?.s === 1) {
            setloading(false);
            toast.success("Terms and Condition updated ");
            dispatch(GetPrivacyandTermsConditiondata())
              .unwrap()
              .then((result) => {
                SetTermsAndcondition(result?.r?.terms_condition);
              });
          } else {
            setloading(false);
          }
        });
    } else {
      toast.error("Terms and Conditions cannot be empty");
    }
  };
  let updatetermsandcondition = (e) => {
    SetTermsAndcondition(e);
  };
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            width: "10%",
            mt: "-50px",
            mr: "0px",
            background: "#9CE0FF",
            textTransform: "capitalize",
            color: "#000",
            height: "40px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              background: "#5BAFCD",
            },
          }}
          onClick={handleUpdateTermscondition}
        >
          Update
        </Button>
      </Box>
      {loading ? (
        <Box>
          <span className="loader"></span>
         

        </Box>
      ) : (
        <ReactQuill
          value={TermsAndcondition && TermsAndcondition.trimStart()}
          onChange={updatetermsandcondition}
          style={{
            width: "100%",
            textAlign: "left",
            height: "76vh",
            border: "none",
          }}
          theme="snow"
          modules={{
            toolbar: {
              container: [
                [{ font: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"],
                ["clean"],
                [{ size: ["small", false, "large", "huge"] }],
              ],
            },
          }}
        />
      )}
    </>
  );
};

export default TermsandConditions;
