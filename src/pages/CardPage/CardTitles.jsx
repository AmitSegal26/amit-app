import React from "react";
import { Box, Typography } from "@mui/material";

const CardTitles = ({ cardStateProp, atomProp }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography align="center" component="h1" variant="h3">
        Card Page:
      </Typography>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 600, md: 600 },
          maxWidth: { xs: 600, md: 600 },
        }}
        alt={cardStateProp.alt ? cardStateProp.alt : ""}
        src={cardStateProp.url ? cardStateProp.url : atomProp}
      />
    </Box>
  );
};

export default CardTitles;
