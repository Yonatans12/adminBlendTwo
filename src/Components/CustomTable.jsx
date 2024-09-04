import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const CustomTable = ({columns,data ,renderBodyContent }) => {
  return (
    <div>
        
        <Box sx={{ mt: "15px" }}>
        <Paper style={{ width: "100%", overflow: "hidden" }}>
          <TableContainer style={{   }}>
            <Table stickyHeader>
              <TableHead >
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        textAlign: "center",
                        fontSize: "14px",
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
              <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns?.length}  align="center"  sx={{ textAlign: "center" }}>No Data</TableCell>
                </TableRow>
              ) : (
                data?.map((row, index) => (
                  renderBodyContent(row, index)
                ))
              )}
            </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TablePagination
            sx={{ mb: "-20px" }}
            // component="div"
            count={sessionsdata?.UserEbooksData?.count || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box> */}

 
      </Box>
    </div>
  )
}

export default CustomTable