import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const TableForCRM = ({
  usersArrStateProp,
  handleSeeProfileClickFunc,
  handleEditUserFunc,
  handleDeleteUserFunc,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Profile Picture</TableCell>
            <TableCell>Business</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersArrStateProp.length ? (
            usersArrStateProp.map((user) => (
              <Fragment key={"user" + user._id}>
                <TableRow hover>
                  <TableCell>{user.firstName + " " + user.lastName}</TableCell>
                  <TableCell>
                    <Avatar
                      src={user.imageUrl ? user.imageUrl : ""}
                      alt={
                        user.imageAlt
                          ? user.imageAlt
                          : `Profile picture of ${user.firstName}`
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {user.biz ? "business" : "not business"}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      <Button id={user._id} onClick={handleSeeProfileClickFunc}>
                        More Details{<OpenInFullIcon />}
                      </Button>
                      {!user.isAdmin ? (
                        <Fragment>
                          {" "}
                          <Button
                            id={user._id}
                            style={{ width: "10vw" }}
                            variant="contained"
                            color="primary"
                            onClick={handleEditUserFunc}
                          >
                            {user.biz ? "revoke business" : "make business"}
                          </Button>
                          <Button
                            id={user._id}
                            style={{ width: "10vw" }}
                            variant="contained"
                            color="secondary"
                            onClick={handleDeleteUserFunc}
                          >
                            Delete
                          </Button>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: {
                          xs: "flex",
                          sm: "none",
                          flexDirection: "column",
                        },
                      }}
                    >
                      <Grid item xl={12}>
                        <Button
                          id={user._id}
                          onClick={handleSeeProfileClickFunc}
                          style={{ m: 1 }}
                        >
                          More Details{<OpenInFullIcon />}
                        </Button>
                      </Grid>
                      {!user.isAdmin ? (
                        <Grid container spacing={1}>
                          <Grid item xl={12}>
                            <Button
                              id={user._id}
                              style={{ width: "10vw" }}
                              variant="contained"
                              color="primary"
                              onClick={handleEditUserFunc}
                            >
                              <EditIcon id={user._id} />
                            </Button>
                          </Grid>
                          <Grid item xl={12}>
                            <Button
                              id={user._id}
                              style={{ width: "10vw" }}
                              variant="contained"
                              color="secondary"
                              onClick={handleDeleteUserFunc}
                            >
                              <DeleteForeverIcon id={user._id} />
                            </Button>
                          </Grid>
                        </Grid>
                      ) : (
                        ""
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No users found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableForCRM;
