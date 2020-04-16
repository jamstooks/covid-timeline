import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    paddingTop: "30vh"
  }
}));

export default function LoadingIndicator() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <p>Loading Data...</p>
    </div>
  );
}
