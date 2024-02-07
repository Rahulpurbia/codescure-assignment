import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DataTable = ({ data = [], status, currentPage = 1 }) => {
  return (
    <>
      {data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bold">Sl.No.</TableCell>
                <TableCell className="bold">Name</TableCell>
                <TableCell align="center" className="bold">
                  Birth Year
                </TableCell>
                <TableCell align="center" className="bold">
                  Species
                </TableCell>
                <TableCell align="center" className="bold">
                  Edited
                </TableCell>
                <TableCell align="center" className="bold">
                  Eye Color
                </TableCell>
                <TableCell align="center" className="bold">
                  Gender
                </TableCell>
                <TableCell align="center" className="bold">
                  Hair Color
                </TableCell>
                <TableCell align="center" className="bold">
                  Height
                </TableCell>
                <TableCell align="center" className="bold">
                  Homeworld
                </TableCell>
                <TableCell align="center" className="bold">
                  Mass
                </TableCell>
                <TableCell align="center" className="bold">
                  Skin Color
                </TableCell>
              </TableRow>
            </TableHead>
            {status === "succeeded" && (
              <TableBody>
                {data.map((value, index) => {
                  let specie = value.species[0] || "";
                  let type = specie[specie?.length - 2];
                  let icon =
                    type == 1 ? "user" : type == 2 ? "android" : "question";
                  return (
                    <TableRow
                      key={value.created}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {(currentPage - 1) * 10 + index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {value.name}
                      </TableCell>
                      <TableCell>{value.birth_year}</TableCell>
                      <TableCell className="no-wrap">
                        <i className={`fa fa-${icon} fa-2x`}></i>
                      </TableCell>
                      <TableCell>{value.edited}</TableCell>
                      <TableCell>{value.eye_color}</TableCell>
                      <TableCell>{value.gender}</TableCell>
                      <TableCell>{value.hair_color}</TableCell>
                      <TableCell>{value.height}</TableCell>
                      <TableCell>{value.homeworld}</TableCell>
                      <TableCell>{value.mass}</TableCell>
                      <TableCell>{value.skin_color}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : (
        <div className="text-center mt-20 bold">
          <i class="fa fa-triangle-exclamation fa-2x" aria-hidden="true"></i>
        </div>
      )}
      {status === "loading" && (
        <div className="text-center mt-20 bold">
          <i class="fa fa-spinner fa-3x" aria-hidden="true"></i>
        </div>
      )}
    </>
  );
};

export default DataTable;
