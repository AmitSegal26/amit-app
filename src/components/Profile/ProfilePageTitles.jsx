import { Avatar, Typography } from "@mui/material";
import React, { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
const ProfilePageTitles = ({ disableFieldStateProp }) => {
  return (
    <Fragment>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {disableFieldStateProp ? (
          <AccountBoxIcon />
        ) : (
          <Fragment>
            <AccountBoxIcon />
            <EditIcon />
          </Fragment>
        )}
      </Avatar>
      <Typography component="h1" variant="h4">
        Profile Page
      </Typography>
    </Fragment>
  );
};

export default ProfilePageTitles;
