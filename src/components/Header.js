import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { colors } from "../theme";

const useStyles = makeStyles(theme => ({
  header: {
    textAlign: "center",
    backgroundColor: colors.cases[10],
    color: "white",
    padding: ".5em",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.cases[13],
    fontFamily: "'Roboto', sans-serif",
    textTransform: "uppercase"
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography variant="h4" component="h1">
        U.S. Covid19 Timeline
      </Typography>
    </div>
  );
}
