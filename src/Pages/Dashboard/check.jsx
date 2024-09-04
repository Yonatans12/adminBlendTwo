import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button, Card, Menu, MenuItem, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { API_URL } from "../../../../../Api/Config/Config";
import { getProduct } from "../../../../../Api/Product/ApiProduct";

import Header from "../../../../../Component/Header";

const Product = () => {
  const [product, setproduct] = useState();
  useEffect(() => {
    const getproductdata = async () => {
      const data = await getProduct();
      if (data?.s) setproduct(data?.r);
    };
    getproductdata();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigator = useNavigate("");
  const columns = [
    {
      field: "id",
      headerName: "Id",
      headerAlign: "center",
      align: "center",
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "p_name",
      headerName: "product",
      headerAlign: "center",
      align: "center",
      flex: 1,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Box sx={{ width: "40px", height: "40px", mr: 2 }}>
            <img
              src={API_URL.productimage + product[0]?.image}
              alt="img"
              width="100%"
              height="100%"
              style={{ borderRadius: "5px" }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" color="initial">
              {" "}
              {params.row.p_name}
            </Typography>
          </Box>
        </Box>
      ),
    },

    {
      field: "p_desc",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      flex: 1,
      disableColumnMenu: true,
    },

    {
      field: "p_price",
      headerName: "Price",

      headerAlign: "center",
      align: "center",
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "Actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      flex: 1,
      disableColumnMenu: true,
      renderCell: () => (
        <div>
          <Box
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon sx={{ cursor: "pointer" }} />
          </Box>
          <Box>
            <Menu
              elevation={0}
              id="basic-menu"
              PaperProps={{
                sx: {
                  px: 0.5,
                  overflow: "hidden",
                  boxShadow: "0px 0px 2px 0px rgba(241, 149, 178,0.2)",
                  // border: "2px solid #eee",
                  // filter: 'drop-shadow(0px 1px 1px rgba(241, 149, 178,0.2))',
                },
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: "bottom", vertical: "top" }}
              anchorOrigin={{ horizontal: "bottom", vertical: "bottom" }}
            >
              <MenuItem onClick={() => navigator("/viewproduct")}>
                <RemoveRedEyeIcon sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="h1" color="initial">
                  View
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ModeEditIcon sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="h1" color="initial">
                  Edit
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{ color: "red" }}>
                <DeleteForeverIcon sx={{ mr: 1 }} fontSize="small" />
                <Typography variant="h1" color="initial">
                  Delete
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </div>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Header value="Product " />
        </Box>
        <Box>
          <Button
            onClick={() => navigator("/addproduct")}
            sx={{
              backgroundColor: "#4A252D",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "500",
              fontSize: { xs: "15px", sm: "17px" },
              color: "#fff",
              py: 1,
              px: 2,
              "&:hover": {
                backgroundColor: "#F195B2",
              },
            }}
          >
            <AddIcon sx={{ mr: 1, display: { xs: "none", sm: "flex" } }} /> New
            Product
          </Button>
        </Box>
      </Box>
      <Box>
        <Card sx={{ width: "100%", borderRadius: "20px" }}>
          <Box height="575px">
            <DataGrid
              sx={{ textTransform: "capitalize" }}
              disableSelectionOnClick
              disableRowSelectionOnClick
              rows={product ? product : []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Product;
