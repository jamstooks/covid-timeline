import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { colors } from "../theme";

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: "center",
    backgroundColor: colors.cases[10],
    color: "white",
    padding: ".7em 0 .6em 0",
    fontFamily: "'Roboto', sans-serif",
    // textTransform: "uppercase"
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography variant="h4" component="h1">
        U.S. Covid-19 Timeline
      </Typography>
    </div>
  );
}
