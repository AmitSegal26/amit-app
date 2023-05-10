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
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import AlertDialog from "../../components/DialogComponent";

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
                        More Details{<OpenInFullIcon id={user._id} />}
                      </Button>
                      {!user.isAdmin ? (
                        <Fragment>
                          {" "}
                          <Button
                            id={user._id}
                            variant="contained"
                            color="primary"
                            onClick={handleEditUserFunc}
                          >
                            {user.biz ? "revoke business" : "make business"}
                          </Button>
                          <AlertDialog
                            id={user._id}
                            isForDeleting={true}
                            onBtnChangeBizNumberClick={handleDeleteUserFunc}
                            buttonText="Delete User"
                            questionHead={`Are you sure you want to delete ${user.firstName}?`}
                            questionBody="Deleting this user is permanent. After
                          Clicking 'Delete' the user's information and existence will be lost forever"
                            acceptText="Delete"
                          />
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
                          More Details{<OpenInFullIcon id={user._id} />}
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
                            <AlertDialog
                              id={user._id}
                              isForDeleting={true}
                              onBtnChangeBizNumberClick={handleDeleteUserFunc}
                              buttonText="Delete User"
                              questionHead={`Are you sure you want to delete ${user.firstName}`}
                              questionBody="Deleting this user is permanent. After
                          Clicking 'Delete' the user's information and existence will be lost forever"
                              acceptText="Delete"
                            />
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
