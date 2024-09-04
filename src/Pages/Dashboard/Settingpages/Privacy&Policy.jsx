   
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
const PrivacyandPolicy = () => {
  let dispatch = useDispatch();
 
  const [Privacypolicy, SetPrivacypolicy] = useState(
""
  );
  let [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true)
    dispatch(GetPrivacyandTermsConditiondata()).unwrap().then((result)=>{
      setloading(false)
    SetPrivacypolicy(result?.r?.privacy_policy)
    })
  }, []);


  const handleUpdateTermscondition = () => {
    const processedContent = Privacypolicy.replace(/<p>\s*<\/p>/g, "");
    const isEmptyContent =
      processedContent.trim() === "" || processedContent === "<p><br></p>";

    if (!isEmptyContent) {
      let PrivacyPolicydata = new FormData();
      PrivacyPolicydata.append("privacy_policy", Privacypolicy);
      setloading(true);
       
      dispatch(UpadtePrivacyandTermsConditiondata(PrivacyPolicydata))
        .unwrap()
        .then((result) => {
          if (result?.s === 1) {
            setloading(false);
            toast.success("Privacy policy updated !");
            dispatch(GetPrivacyandTermsConditiondata()).unwrap().then((result)=>{
              SetPrivacypolicy(result?.r?.privacy_policy)
              })
          } else {
            setloading(false);
          }
        });
    } else {
      toast.error("Privacy policy cannot be empty");
    }
  };
  let updateprivacypolicy = (e) => {
    SetPrivacypolicy(e);
  };
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <Button
      disabled={loading}
  onClick={handleUpdateTermscondition}
  sx={{
    width: "10%",
    mt: "-40px",
    mr: "0px",
    background: "#9CE0FF",
    textTransform: "capitalize",
    color: "#000",
    height: "40px",
    transition: "background-color 0.3s ease", // Add transition property
    "&:hover": {
      background: "#40C4FF", // Darker background color on hover
    },
  }}
>
Update
</Button>

      </Box>


{loading?    <Box>
          <span className="loader"></span>
         

        </Box>:   <ReactQuill
        value={Privacypolicy}
        onChange={updateprivacypolicy}
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
      />}
    
    </>
  );
};

export default PrivacyandPolicy;
