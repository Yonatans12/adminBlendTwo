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
  HandeldPrompts,
  Prompt_Listing,
} from "../../../ReduxToolkit/Slices/ContentManagment/ContentManage.action";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Prompts = () => {
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
      headerName: "Question",
      field: "prompts",
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
              {params?.row?.prompts ? params?.row?.prompts : "--- "}
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
                    handeldeditPrompt(params?.row?.id, params?.row?.prompts)
                  }
                />
              </Box>
            }
          />
          <GridActionsCellItem
            icon={
              <Box>
                <img
                  onClick={() => deletePrompt(params?.row?.id)}
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
  const PromptsData = useSelector((store) => store?.ContentManage);
  let Rowdata =  PromptsData?.prompts?.r?.map((data, i) => ({
    rowid: i + 1 + page * 10,
    ...data,
  }));
  let [prompt, setprompt] = useState("");
  let handeldPromptinput = (e) => {
    setprompt(e.target.value);
  };
  const [typeCheck, settypecheck] = useState(1);
  const [editpromptid, seteditpromptid] = useState(null);
  let [promptactionloader, setpromptactionloader] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(Prompt_Listing(newPage * 10));
  };

  useEffect(() => {
    dispatch(Prompt_Listing(page * 10));
  }, []);

  let handeldPromptAction = () => {
    // --- Add Edit Prompts  ------
    let formdata = new FormData();
    if (!prompt?.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    if (typeCheck === 2) {
      formdata.append("prompt_id", editpromptid);
    }
    setpromptactionloader(true);
    formdata.append("type", typeCheck);
    formdata.append("question", prompt);
    dispatch(HandeldPrompts(formdata))
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
          dispatch(Prompt_Listing(page * 10));
          setpromptactionloader(false);
          setprompt("");
          settypecheck(1);
        }
        setpromptactionloader(false);
      });
  };

  let clearEditField = () => {
    setprompt("");
    settypecheck(1);
  };
  let handeldeditPrompt = (id, prompt) => {
    seteditpromptid(id);
    setprompt(prompt);
    settypecheck(2);
  };

  let deletePrompt = (promptid) => {
    try {
      let formdata = new FormData();
      formdata.append("type", 3);
      formdata.append("prompt_id", promptid);

      Swal.fire({
        title: "Are you sure want to delete this Prompt?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#40C4FF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(HandeldPrompts(formdata))
            .unwrap()
            .then((result) => {
              if (result?.s === 1) {
                dispatch(Prompt_Listing(page * 10));
                clearEditField();
                toast("Prompt deleted !", {
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
              {typeCheck === 1 ? " Enter Prompt" : "    Edit Prompt"}
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
              placeholder="Enter prompt"
              name="email"
              onChange={handeldPromptinput}
              value={prompt?.trimStart()}
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
                loading={promptactionloader}
                disabled={promptactionloader}
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
            Prompt List
          </Typography>

          <Box sx={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={Rowdata || []}
              columns={columns}
              disableSelectionOnClick
              disableRowSelectionOnClick
              editMode="false"
              loading={PromptsData?.loading}
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
          <TablePagination
            sx={{ mt: "5px" }}
            component="div"
            count={PromptsData?.prompts?.count || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
          />
        </Box>
      </Box>
    </>
  );
};

export default Prompts;
