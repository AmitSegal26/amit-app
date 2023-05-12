import { Button, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import FormButtonsComponent from "../../components/FormButtonsComponent";
import { Link } from "react-router-dom";
import ROUTES from "../../routers/ROUTES";

const ProfilePageBtnsAndLinks = ({
  onOpenEditDetails,
  onCancelBtn,
  onResetBtn,
  onRegisterBtn,
  disableFieldStateProp,
  disableBtnProp,
}) => {
  const handleOpenEditClick = () => {
    onOpenEditDetails();
  };
  const handleCancelBtnClick = () => {
    onCancelBtn();
  };
  const handleResetBtnClick = () => {
    onResetBtn();
  };
  const handleBtnClick = () => {
    onRegisterBtn();
  };
  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Button
            color="warning"
            variant="outlined"
            fullWidth
            sx={{ mt: 2, mb: 0 }}
            onClick={handleOpenEditClick}
          >
            Edit Details
          </Button>
        </Grid>
      </Grid>
      <FormButtonsComponent
        onCancel={handleCancelBtnClick}
        onReset={handleResetBtnClick}
        onRegister={handleBtnClick}
        clickBtnText={
          !disableFieldStateProp ? "Save Changes" : "Have a Great Day :D"
        }
        disableProp={disableBtnProp || disableFieldStateProp}
        disableAll={disableFieldStateProp}
      />
      <Grid container justifyContent="flex-end">
        <Grid item></Grid>
      </Grid>
    </Fragment>
  );
};

export default ProfilePageBtnsAndLinks;
