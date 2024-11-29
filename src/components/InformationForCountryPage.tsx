import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export default function InformationForCountryPage({ info }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "70%",
          height: "auto",
          padding: 5,
        },
      }}
    >
      <Paper elevation={3}>
        <Typography variant="body1" align="justify">
          {info}
        </Typography>
      </Paper>
    </Box>
  );
}
