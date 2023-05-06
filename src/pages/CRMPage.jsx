// import axios from "axios";
// import React, { useEffect } from "react";

// const CRMPage = () => {
//   useEffect(() => {
//     (async () => {
//       try {
//         let { data } = await axios.get("/users/getAllUsers");
//         console.log("🚀 ~ file: CRMPage.jsx:9 ~ data:", data);
//       } catch (err) {
//         console.log(err);
//       }
//     })();
//   }, []);
//   return <div>CRMPage</div>;
// };

// export default CRMPage;

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Outlet, useNavigate } from "react-router-dom";
const CRMPage = () => {
  const navigate = useNavigate();
  const [usersArrState, setUsersArrState] = useState([]);
  const [isOpen, setIsOpen] = useState([]); //state for users to be known as open on a nested route below

  useEffect(() => {
    axios
      .get("users/getAllUsers")
      .then(({ data: { users } }) => {
        setUsersArrState(users);
        console.log(users);
        let newIsOpenState = JSON.parse(JSON.stringify(users));
        for (const user of newIsOpenState) {
          delete user.firstName;
          delete user.middleName;
          delete user.lastName;
          delete user.email;
          delete user.biz;
          delete user.isAdmin;
          delete user.imageUrl;
          delete user.imageAlt;
          delete user.phone;
          delete user.state;
          delete user.country;
          delete user.city;
          delete user.street;
          delete user.houseNumber;
          delete user.zipCode;
          user.isOpen = false;
        }
        console.log("initial isopenarr", newIsOpenState);
        setIsOpen(newIsOpenState);
      })
      .catch((err) => {
        toast.error("ERR" + err.response.data);
      });
  }, []);

  const handleDeleteUser = (ev) => {
    axios
      .delete("/users/" + ev.target.id)
      .then(() => {
        let newUsersArr = JSON.parse(JSON.stringify(usersArrState));
        newUsersArr = newUsersArr.filter((user) => user._id !== ev.target.id);
        setUsersArrState(newUsersArr);
      })
      .catch((err) => {
        toast.error("ERR " + err.response.data);
      });
  };

  const handleEditUser = (ev) => {
    // navigate to the edit user page
  };
  const handleSeeProfileClick = (ev) => {
    console.log("here", ev.target.id);
    let { id } = ev.target;
    console.log("🚀 ~ file: CRMPage.jsx:97 ~ handleSeeProfileClick ~ id:", id);
    navigate(`/crm/${id}`); //localhost:3000/crm/XXX
  };
  const handleInfoClick = (ev) => {
    let newIsOpenState = JSON.parse(JSON.stringify(isOpen));
    newIsOpenState.map((userIndex) => {
      if (userIndex._id == ev.target.id) {
        userIndex.isOpen = true;
      } else {
        userIndex.isOpen = false;
      }
    });
    setIsOpen(newIsOpenState);
  };

  return (
    <Fragment>
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
            {usersArrState.length ? (
              usersArrState.map((user) => (
                <Fragment key={user._id}>
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.firstName + " " + user.lastName}
                    </TableCell>
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
                      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                        {user.isAdmin ? (
                          <Fragment>
                            {" "}
                            <Button
                              id={user._id}
                              style={{ width: "10vw" }}
                              variant="contained"
                              color="primary"
                              onClick={handleEditUser}
                            >
                              Edit
                            </Button>
                            <Button
                              id={user._id}
                              style={{ width: "10vw" }}
                              variant="contained"
                              color="secondary"
                              onClick={handleDeleteUser}
                            >
                              Delete
                            </Button>
                          </Fragment>
                        ) : (
                          ""
                        )}

                        <Button
                          id={user._id}
                          style={{ width: "10vw" }}
                          variant="contained"
                          color="secondary"
                          onClick={handleInfoClick}
                        >
                          {isOpen.find((userIndex) => userIndex._id == user._id)
                            .isOpen ? (
                            <ExpandMoreIcon id={user._id} />
                          ) : (
                            <ExpandLessIcon id={user._id} />
                          )}
                        </Button>
                        <Button id={user._id} onClick={handleSeeProfileClick}>
                          CLICK HERE TO SEE PROFILE
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: {
                            xs: "flex",
                            sm: "none",
                            flexDirection: "column",
                          },
                        }}
                      >
                        {user.isAdmin ? (
                          <Fragment>
                            <Button
                              id={user._id}
                              style={{ width: "10vw" }}
                              variant="contained"
                              color="primary"
                              onClick={handleEditUser}
                            >
                              <EditIcon id={user._id} />
                            </Button>
                            <Button
                              id={user._id}
                              style={{ width: "10vw" }}
                              variant="contained"
                              color="secondary"
                              onClick={handleDeleteUser}
                            >
                              <DeleteForeverIcon id={user._id} />
                            </Button>
                          </Fragment>
                        ) : (
                          ""
                        )}

                        <Button
                          id={user._id}
                          style={{ width: "10vw" }}
                          variant="contained"
                          color="secondary"
                          onClick={handleInfoClick}
                        >
                          {isOpen.find((userIndex) => userIndex._id == user._id)
                            .isOpen ? (
                            <ExpandMoreIcon id={user._id} />
                          ) : (
                            <ExpandLessIcon id={user._id} />
                          )}
                        </Button>
                        <Button id={user._id} onClick={handleSeeProfileClick}>
                          CLICK HERE TO SEE PROFILE
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                  {isOpen.find((userIndex) => userIndex._id == user._id)
                    .isOpen ? (
                    <TableRow>
                      <TableCell>Email: {user.email}</TableCell>
                      <TableCell>Phone: {user.phone}</TableCell>
                      <TableCell>
                        Address:{" "}
                        {user.country +
                          ", " +
                          user.city +
                          ", " +
                          user.street +
                          ", " +
                          user.houseNumber}
                      </TableCell>
                      <TableCell>
                        Admin: {user.isAdmin ? "Yes" : "Not"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    console.log("no")
                  )}
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
      <Outlet />
    </Fragment>
  );
};

export default CRMPage;
