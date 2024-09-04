import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../../Components/PageTitle";
import { GetContactusdata } from "../../ReduxToolkit/Slices/ContentManagment/ContentManage.action";

const columns = [
  { id: "#", label: "#" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "Phone_cc", label: "Phone" },
  { id: "description", label: "Description" },
];
const DescriptionCell = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [text]);

  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        ref={textRef}
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: showFullText ? "normal" : "nowrap",
          display: "-webkit-box",
          WebkitLineClamp: showFullText ? "none" : 1,
          WebkitBoxOrient: "vertical",
          textWrap: "wrap",
        }}
      >
        {text}
      </Typography>
      {isOverflowing && (
        <Button
          onClick={() => setShowFullText(!showFullText)}
          sx={{
            mt: 1,
            fontSize: "12px",
            bgcolor: "#40C4FF",
            transition: "background-color 0.3s ease",
            "&:hover": {
              background: "lightblue",
            },
            textTransform: "capitalize",
            color: "white",
            height: "25px",
            alignSelf: "center",
          }}
        >
          {showFullText ? " See Less" : "See More"}
        </Button>
      )}
    </div>
  );
}
const ContactUs = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(GetContactusdata(newPage * 10));
  }
  useEffect(() => {
    dispatch(GetContactusdata(page * 10));
  }, [dispatch, page]);

  let Data = useSelector((Store) => Store?.ContentManage);
  let Rowdata = Data?.contactus?.r?.map((data, i) => ({
    rowid: i + 1 + page * 10,
    ...data,
  }))
  return (
    <>
      <PageTitle Title={"Contact Us "} />
      <Box sx={{ height: { xs: "80vh", sm: 590 }, width: "100%" }}>
        <Paper style={{ width: "100%", overflow: "hidden", height: "80vh" }}>
          <TableContainer style={{ maxHeight: "81vh" }}>
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
                {Rowdata?.map((row, i) => (
                  <TableRow
                    key={row.id}
                    sx={{ textAlign: "center", width: "100%" }}
                  >
                    <TableCell sx={{ textAlign: "center", width: "5%" }}>
                      {i + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        width: "15%",
                        fontWeight: "600",
                      }}
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                        width: "20%",
                        fontWeight: "600",
                      }}
                    >
                      {row?.email}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", width: "15%" }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                      >
                        {row.phno === null
                          ? "---"
                          : `${row.phno_cc} ${row.phno}`}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", width: "100%" }}>
                      <DescriptionCell text={row?.description} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <TablePagination
          sx={{ mb: "-20px" }}
          component="div"
          count={Data.contactus?.count || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      </Box>
    </>
  );
};

export default ContactUs;
