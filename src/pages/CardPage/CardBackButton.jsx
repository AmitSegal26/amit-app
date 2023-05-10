import React from "react";
import { Button, Grid } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import ROUTES from "../../routers/ROUTES";

const CardBackButton = ({ whereToVar, onBackClick }) => {
  return (
    <Grid container>
      <Grid item sm={3}>
        <Button variant="outlined" onClick={onBackClick}>
          <FirstPageIcon />
          Back to{" "}
          {whereToVar == ROUTES.MYCARDS
            ? "Your Cards"
            : whereToVar == ROUTES.FAVCARDS
            ? "Your Favorite Cards"
            : "Home"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CardBackButton;
