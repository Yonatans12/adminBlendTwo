import { Box, InputLabel, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomLoaderButton from "../../../Components/CustomLoaderButton";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";
import totalusericon from "../../../Assets/Logo/totalusers.png";
import deleteicon from "../../../Assets/Logo/Delete.png";
import editicon from "../../../Assets/Logo/Edit.png";
import { useDispatch, useSelector } from "react-redux";
import {
  AddReligione,
  HandeldReligione,
  Religione_Listing,
} from "../../../ReduxToolkit/Slices/ContentManagment/ContentManage.action";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Religion = () => {
  const columns = [
    {
      field: "rowid",
      headerName: "#",
      headerAlign: "center",
      align: "center",
      flex: 0.2,
      minWidth: 80,
      disableColumnMenu: true,
    },
    {
      headerName: "Religion",
      field: "name",
      headerAlign: "center",
      align: "center",
      flex: 3,
      minWidth: 150,
      disableColumnMenu: true,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={
            <Typography
              noWrap
              sx={{
                color: "#000",
                textOverflow: "ellipsis",
                fontSize: "14px",
                textalign: "center",
              }}
            >
              {params?.row?.name ? params?.row?.name : "--- "}
            </Typography>
          }
        />
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 200,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box>
          <GridActionsCellItem
            icon={
              <Box>
                <img
                  style={{ cursor: "pointer" }}
                  src={editicon}
                  width="30px"
                  height={"30px"}
                  onClick={() =>
                    handeldeditPrompt(params?.row?.id, params?.row?.name)
                  }
                />
              </Box>
            }
          />
          <GridActionsCellItem
            icon={
              <Box>
                <img
                  onClick={() => deletelanguage(params?.row?.id)}
                  style={{ cursor: "pointer" }}
                  src={deleteicon}
                  width="30px"
                  height={"30px"}
                />
              </Box>
            }
          />
        </Box>
      ),
    },
  ];
  let dispatch = useDispatch();
  
  const [page, setPage] = useState(0);
  const LanguageData = useSelector((store) => store?.ContentManage);
  let Rowdata = [...( LanguageData?.Religion?.r ?? [])]?.reverse()?.map((data, i) => ({
    rowid: i + 1 + page * 10,
    ...data,
  }));
  // let [prompt, setprompt] = useState("");
  let [langauage, setlanguage] = useState("");
  let handeldPromptinput = (e) => {
    setlanguage(e.target.value);
  };
  const [typeCheck, settypecheck] = useState(1);
  const [editpromptid, seteditpromptid] = useState(null);
  let [actionloader, setactionloader] = useState(false);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   dispatch(Language_Listing(newPage * 10));
  // };

  useEffect(() => {
    dispatch(Religione_Listing(page * 10));
  }, []);

  let handeldPromptAction = () => {
    // --- Add Edit Prompts  ------
    let formdata = new FormData();
    if (!langauage?.trim()) {
      toast.error("Please enter a Religion name !");
      return;
    }
    if (typeCheck === 2) {
      formdata.append("id", editpromptid);
    }
    setactionloader(true);
    formdata.append("name", langauage);

    dispatch(
      typeCheck === 2 ? HandeldReligione(formdata) : AddReligione(formdata)
    )
      .unwrap()
      .then((result) => {
        if (result?.s === 1) {
          toast(result?.m, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          dispatch(Religione_Listing(page * 10));
          setactionloader(false);
          setlanguage("");
          settypecheck(1);
        }
        setactionloader(false);
      });
  };

  let clearEditField = () => {
    setlanguage("");
    settypecheck(1);
  };
  let handeldeditPrompt = (id, langauage) => {
    seteditpromptid(id);
    setlanguage(langauage);
    settypecheck(2);
  };

  let deletelanguage = (id) => {
    try {
      let formdata = new FormData();
      formdata.append("status", 0);
      formdata.append("id", id);
      Swal.fire({
        title: "Are you sure want to delete this Religion ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#40C4FF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(HandeldReligione(formdata))
            .unwrap()
            .then((result) => {
              if (result?.s === 1) {
                dispatch(Religione_Listing(page * 10));
                clearEditField();
                toast("Religion deleted !", {
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
    } catch (err) {
      toast.error("Something wents wrong please try again !");
    }
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
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
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
              {typeCheck === 1 ? " Enter Religion" : " Edit Religion"}
            </InputLabel>
            {typeCheck === 2 ? (
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
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                Clear <CancelIcon />
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
              gap: "20px",
              width: "80%",
              justifyContent: "center",
              //   border:"solid red"
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter Religion"
              name="email"
              onChange={handeldPromptinput}
              value={langauage?.trimStart()}
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
            <Box sx={{ width: "120px" }}>
              <CustomLoaderButton
                onClick={handeldPromptAction}
                type="submit"
                btn_title={typeCheck === 2 ? "Edit" : "Add"}
                loading={actionloader}
                disabled={actionloader}
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
            padding: "25px 25px 0px 25px",
            borderRadius: "10px",
            height: "60vh",
            // border:"solid red"
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
            Religion List
          </Typography>

          <Box sx={{ height: 350, width: "100%" }}>
            <DataGrid
              rows={Rowdata || []}
              columns={columns}
              disableSelectionOnClick
              disableRowSelectionOnClick
              editMode="false"
              loading={LanguageData?.loading}
              hideFooter
              sx={{
                border: "0px",
                borderRadius: "20px",
                boxShadow: 2,
                color: "#000",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            />
          </Box>
          {/* <TablePagination
            sx={{ mt: "5px" }}
            component="div"
            count={LanguageData?.prompts?.count || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
          /> */}
        </Box>
      </Box>
    </>
  );
};

export default Religion;
