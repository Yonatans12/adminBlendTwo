import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TablePagination } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from "react";
import CustomLoaderButton from "../../../Components/CustomLoaderButton";
import deleteicon from "../../../Assets/Logo/Delete.png";
import editicon from "../../../Assets/Logo/Edit.png";
import removeinteresticon from "../../../Assets/Logo/removeInterest.png";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  AddNewsubIntrest,
  DeleteIntrest,
  GetIntrest,
  GetPrivacyandTermsConditiondata,
  IntrestCategoryActions,
} from "../../../ReduxToolkit/Slices/ContentManagment/ContentManage.action";
import toast from "react-hot-toast";
import { BaseUrl } from "../../../ReduxToolkit/Api";
import { CustomModal } from "../../../Components/CustomModal";

const Interest = () => {
  const columns = [
    { id: "#", label: "#" },
    { id: "Category", label: "Category" },
    { id: "Interest", label: "Interest" },
    { id: "Add Interest", label: "Add Interest" },
    { id: "Action", label: "Action" },
  ];

  let dispatch = useDispatch();
  const ContentData = useSelector((store) => store?.ContentManage);

  const [typeCheck, settypecheck] = useState(0);
  let [interest, setinterest] = useState("");
  let [editcatid, seteditcatid] = useState(null);
  let [editimg, seteditimg] = useState(null);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(GetIntrest(newPage * 10));
  };

  useEffect(() => {
    dispatch(GetIntrest(page * 10));
    dispatch(GetPrivacyandTermsConditiondata());
  }, []);

  const handleEditCategory = (id, cat_value, img_url) => {
    setinterest(cat_value);
    settypecheck(1);
    seteditcatid(id);
    seteditimg(img_url);
  };
  let handeldinput = (e) => {
    setinterest(e.target.value);
  };

  let [selectedimg, setselectedimg] = useState(null);
  let [iconfile, seticonfile] = useState(null);
  let handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file?.type?.startsWith("image/")) {
      toast.error("Icon must be in .png or .img format");
    } else if (file?.size > 500 * 1024) {
      toast.error("Icon size must be less than 500KB");
    } else {
      
      const objectURL = URL.createObjectURL(file);
      setselectedimg(objectURL);
      seticonfile(file);
    }
  };

  let [addcategoryloading, setaddcategoryloading] = useState(false);
  let handeldInterestCategory = () => {
    // --- Add Edit Category ------
    let formdata = new FormData();
    if (typeCheck === 1) {
      if (!interest?.trim()) {
        toast.error("Please enter a category name");
        return;
      }
      formdata.append("type", 2);
      formdata.append("category_id", editcatid);
    } else {
      if (!interest.trim()) {
        toast.error("Please enter a Category ");
        return;
      } else if (!iconfile) {
        toast.error("Please select an Icon");
        return;
      }
      formdata.append("type", 1);
    }
    if (iconfile) {
      formdata.append("category_img", iconfile);
    }
    setaddcategoryloading(true);
    formdata.append("name", interest);
    dispatch(IntrestCategoryActions(formdata))
      .unwrap()
      .then((result) => {
        if (result?.s === 1) {
          setaddcategoryloading(false);
          toast(result?.m, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setselectedimg(null);
          seticonfile(null);
          seteditimg(null);
          window.location.reload();
          setinterest("");
          settypecheck(2);
          dispatch(GetIntrest(page * 10));
          setaddcategoryloading(false);
        } else {
          setaddcategoryloading(false);
        }
      });
  };

  let Delete_Category = (id) => {
    // setDeleteLoadingState(id, true);
    let formdata = new FormData();
    formdata.append("category_id", id);
    formdata.append("is_delete", 0);
    formdata.append("type", 2);

    Swal.fire({
      title: "Are you sure want to delete this Category?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#40C4FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(IntrestCategoryActions(formdata))
          .unwrap()
          .then((result) => {
            // setDeleteLoadingState(id, false);
            if (result?.s === 1) {
              dispatch(GetIntrest(page * 10));
              clearEditField();
              toast("Category deleted !", {
                icon: "👏",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
            }
          });
      }
    });
  };
  let [loadingStates, setLoadingStates] = useState({});
  const setInterestLoadingState = (interestId, isLoading) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [interestId]: isLoading,
    }));
  };
  let [intrestloader, setintrestloader] = useState(false);
  let RemoveIntrest = (id, name) => {
    if (intrestloader) {
      return;
    }
    setInterestLoadingState(id, true);
    setintrestloader(true);
    dispatch(DeleteIntrest({ interest_id: id }))
      .unwrap()
      .then((result) => {
        if (result?.s === 1) {
          dispatch(GetIntrest(page * 10));
          setInterestLoadingState(id, false);
          setintrestloader(false);
          toast(name + " interest deleted ", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          setintrestloader(false);
          toast.error("Something wents wrong while deleting the intrest");
        }
        setInterestLoadingState(id, false);
      });
    setInterestLoadingState(id, false);
  };
  let clearEditField = () => {
    setselectedimg(null);
    seticonfile(null);
    setinterest("");
    settypecheck(2);
    seteditimg(null);
  };
  let [isaddintrestmodalopen, setisaddintrestmodalopen] = useState(false);
  let [addintrestdata, setaddintrestdata] = useState({});
  let [subintrest, setsubintrest] = useState("");
  let handeldSubinput = (e) => {
    setsubintrest(e.target.value);
  };
  let [addintrestloader, setaddintrestloader] = useState(false);
  let handeldaddintrest = () => {
    if (!subintrest.trim()) {
      toast.error("Please enter a intrest");
      return;
    }
    setaddintrestloader(true);
    let formdata = new FormData();
    formdata.append("category_id", addintrestdata?.id);
    formdata.append("name", subintrest);
    dispatch(AddNewsubIntrest(formdata))
      .unwrap()
      .then((result) => {
        if (result?.s === 1) {
          setaddintrestloader(false);
          dispatch(GetIntrest(page * 10));
          toast(
            subintrest +
              " interest Added in " +
              addintrestdata?.Cat_name +
              "category",
            {
              icon: "👏",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            }
          );
          setaddintrestloader(false);
          setsubintrest("");
          setisaddintrestmodalopen(false);
        }
      });
  };
 
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            background: "#F8F8F8",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              
            }}
          >
            <InputLabel
              id="demo-select-small-label"
              sx={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#292D32",
                // color: formErrors.audioTitle ? "red" : "#000",
              }}
            >
              {typeCheck === 1 ? " Edit Category" : " Enter Category"}
            </InputLabel>
            {typeCheck === 1 ? (
              <Typography
                onClick={clearEditField}
                variant="outlined"
                sx={{
                  padding: "5px 10px",
                  borderRadius: "10px",
                  border: "1px solid #40C4FF",
                  cursor: "pointer",
                  background: "#40C4FF",
                  color: "#fff",
                  display:"flex",alignItems:"center",
                  gap:"3px"
                }}
              >
                Clear  <CancelIcon  />  
              </Typography>
            ) : (
              <Typography
                sx={{
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
              ></Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection:{xs:"column",sm: "row"},
              gap: "20px",
              width:{xs:"100%",sm: "80%"},
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter Category"
              name="email"
              onChange={handeldinput}
              value={interest?.trimStart()}
              autoComplete="off"
              style={{
                padding: "10px 40px 10px 15px",
                border: " 1.5px solid  #40C4FF",
                borderRadius: "10px",
                width: "100%",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
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
            <Box>
              <input
                type="file"
                id="interset-icon-file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="interset-icon-file-input">
                {selectedimg !== null || editimg !== null ? (
                  <Box
                    sx={{
                      width: "70px",
                      height: "45px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      border: "1px solid #40C4FF",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                      src={
                        typeCheck === 2
                          ? selectedimg
                          : selectedimg !== null
                          ? selectedimg
                          : `${BaseUrl}/${editimg}`
                      }
                      alt="Selected image"
                    />
                  </Box>
                ) : (
                  <Box sx={{ width: "70px", cursor: "pointer" }}>
                    <Typography
                      sx={{
                        border: "2px solid #40C4FF",
                        textAlign: "center",
                        padding: "5px 0px",
                        fontSize: "12px",
                        textAlign: "center",
                        borderRadius: "10px",
                      }}
                    >
                      Choose Icon
                    </Typography>
                  </Box>
                )}
              </label>
            </Box>
            <Box sx={{ width: "120px" }}>
              <CustomLoaderButton
                onClick={handeldInterestCategory}
                type="submit"
                btn_title={typeCheck === 1 ? "Edit" : "Add"}
                loading={addcategoryloading}
                disabled={addcategoryloading}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            background: "#F8F8F8",
            padding: "25px 25px 5px 25px",

            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#000",
              lineHeight: "26.4px",
            }}
          >
            Interest List
          </Typography>
          <Paper style={{ width: "100%", overflow: "hidden" }}>
            <TableContainer style={{ maxHeight: "41vh" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns?.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          textAlign: "center",
                          fontSize: "15px",
                          lineHeight: "120%",
                          fontWeight: "600",
                          background: "#40C4FF",
                          color: "#000",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={{ textAlign: "center" }}>
                  { ContentData?.Interest?.r?.map((row, i) => (
                    <TableRow
                      key={row.id}
                      sx={{ textAlign: "center", width: "100%" }}
                    >
                      <TableCell
                        sx={{
                          textAlign: "center",
                          width: "8%",
                        }}
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          width: "12%",
                          fontWeight: "600",
                        }}
                      >
                        {row?.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          display: "flex",
                          flexWrap: "wrap",
                          width: "100%",
                          overflow: "wrap",
                          gap: "10px",
                          minHeight: "75px",
                        }}
                      >
                        {row?.subCategory?.length < 1 ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              gap: "8px",
                            }}
                          >
                            {" "}
                            Add Interest !
                          </Box>
                        ) : (
                          row?.subCategory?.map((subinterest) => (
                            <Box
                              sx={{
                                border: "1px solid #292D3280",
                                borderRadius: "10px",
                                padding: "2px 8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                cursor: "pointer",
                                transition: "border 0.3s ease", // Optional: smooth transition
                                // Background color on hover
                                ":hover": {
                                  border: "1px solid #40C4FF",
                                  color: "#40C4FF",
                                },
                              }}
                            >
                              <Typography sx={{ fontWeight: "500" }}>
                                {subinterest?.name}
                              </Typography>
                              <Box
                                sx={{
                                  width: "25px",
                                  height: "25px",
                                  transition: "transform 0.4s ease", // Optional: smooth transition
                                  ":hover img": {
                                    transform: "scale(1.4)", // Increase size on hover
                                  },
                                }}
                              >
                                {loadingStates[subinterest?.id] ? (
                                  <CircularProgress
                                    style={{ width: "25px", height: "25px" }}
                                  />
                                ) : (
                                  <img
                                    style={{ cursor: "pointer" }}
                                    src={removeinteresticon}
                                    width="100%"
                                    height={"100%"}
                                    onClick={() =>
                                      RemoveIntrest(
                                        subinterest?.id,
                                        subinterest?.name
                                      )
                                    }
                                  />
                                )}
                              </Box>
                            </Box>
                          ))
                        )}
                      </TableCell>

                      <TableCell
                        sx={{
                          textAlign: "center",
                          width: "15%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            m: "auto",
                            mt: "10px",
                          }}
                        >
                          <Button
                            onClick={() => {
                              setisaddintrestmodalopen(true);
                              setaddintrestdata({
                                Cat_name: row?.name,
                                id: row?.id,
                              });
                            }}
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "10px",
                              color: "#fff",
                              background: "#40C4FF",
                              transition: "background-color 0.3s ease", // Add transition property
                              "&:hover": {
                                background: "#2ea3f7", // Adjust the color to your preference
                              },
                            }}
                            variant="contained"
                          >
                            Add
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          width: "15%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            m: "auto",
                            mt: "10px",
                            gap: "10px",
                          }}
                        >
                          <img
                            style={{ cursor: "pointer" }}
                            src={editicon}
                            width="30px"
                            height={"30px"}
                            onClick={() =>
                              handleEditCategory(
                                row?.id,
                                row?.name,
                                row?.category_img
                              )
                            }
                          />

                          <img
                            onClick={() => Delete_Category(row?.id)}
                            style={{ cursor: "pointer" }}
                            src={deleteicon}
                            width="30px"
                            height={"30px"}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <TablePagination
            sx={{ mt: "0px" }}
            component="div"
            count={ContentData?.Interest?.count || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
          />
        </Box>
      </Box>

      {/* ----------------------- Add Interest Modal ----------------------- */}

      <CustomModal
        open={isaddintrestmodalopen}
        handleCloseModal={() => setisaddintrestmodalopen(false)}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography>
            Add intrest In {addintrestdata?.Cat_name} category{" "}
          </Typography>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Interest"
            name="email"
            onChange={handeldSubinput}
            value={subintrest?.trimStart()}
            autoComplete="off"
            style={{
              padding: "10px 40px 10px 15px",
              border: " 1.5px solid  #40C4FF",
              borderRadius: "10px",
              width: "100%",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
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
          <CustomLoaderButton
            onClick={handeldaddintrest}
            disabled={addintrestloader}
            btn_title="Add"
            type="submit"
            loading={addintrestloader}
          />
        </Box>
      </CustomModal>
    </>
  );
};

export default Interest;
