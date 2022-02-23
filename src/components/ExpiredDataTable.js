import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function ExpiredDataTable() {
  const [expiredData, setExpiredData] = useState([]);
  const getServerData = () => {
    axios.get("http://localhost:3001/expiredData").then((res) => {
      setExpiredData(res.data);
    });
  };
  useEffect(() => {
    getServerData();
  }, []);
  return (
    <div style={{marginTop:20}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Physical Exam Expired
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Maintenance Due</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Expired Licence States</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expiredData.map((row) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                {row.physicalExamExpired ? (
                  <TableCell
                    align="center"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    Yes
                  </TableCell>
                ) : (
                  <TableCell
                    align="center"
                    sx={{ color: "no", fontWeight: "bold" }}
                  >
                    No
                  </TableCell>
                )}
                {row.maintenanceDue ? (
                  <TableCell
                    align="center"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    Yes
                  </TableCell>
                ) : (
                  <TableCell
                    align="center"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    No
                  </TableCell>
                )}
                {row.licences ? (
                  <TableCell
                    align="center"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    {row.licences.map(state=>{
                        return(
                           <p key={state}>{state}</p>
                        )
                    })}
                  </TableCell>
                ) : (
                  <TableCell
                    align="center"
                    sx={{ color: "green", fontWeight: "bold" }}
                  >
                    None

                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
