import { Grid, IconButton } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddCardButton = ({ handleCreateFunc }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={9} />
      <Grid item xs={3}>
        <IconButton
          sx={{
            position: "fixed",
            top: "80%",
            left: { xs: "80%", sm: "85%", md: "90%" },
          }}
          onClick={handleCreateFunc}
        >
          <AddCircleIcon
            color="primary"
            style={{
              width: "4rem",
              height: "4rem",
              cursor: "pointer",
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default AddCardButton;
