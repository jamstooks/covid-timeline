import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import useTimer from "../hooks/useTimer";

const useStyles = makeStyles({
  root: {
    width: "100",
    padding: "1em 6em 1em 1em"
  }
});

export default function DateSlider({ date, setDate, dates }) {
  const classes = useStyles();
  const [isActive, toggleTimer] = useTimer({
    callback: () => incrementDate(),
    active: false
  });

  const onKeyDown = event => {
    switch (event.keyCode) {
      case 32: // space
        toggleTimer();
        break;
      case 37: // back button
        incrementDate(-1);
        break;
      case 39: // forward button
        incrementDate();
        break;
      default:
        break;
    }
    event.stopPropagation();
  };

  // add key listeners for play/pause and forward/back
  useEffect(() => {
    let loaded = false;
    if (!loaded) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
    loaded = true;
  }); // only run on mount

  const index = dates.map(Number).indexOf(+date);
  const max = dates.length - 1;

  const incrementDate = (increment = 1) => {
    const index = dates.map(Number).indexOf(+date);
    let newIndex = index + increment;
    if (newIndex > dates.length - 1) newIndex = 0;
    if (newIndex < 0) newIndex = dates.length - 1;
    setDate(dates[newIndex]);
  };

  const getDisplayText = ts => format(dates[ts], "M/d");

  const handleChange = (event, newValue) => setDate(dates[newValue]);

  return (
    <div className={classes.root}>
      <Grid
        container
        wrap="nowrap"
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <IconButton aria-label="delete" onClick={toggleTimer}>
            {isActive ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Slider
            value={index}
            onChange={handleChange}
            color="primary"
            marks
            min={0}
            max={max}
            valueLabelDisplay="on"
            aria-labelledby="range-slider"
            valueLabelFormat={t => getDisplayText(t)}
            getAriaValueText={t => getDisplayText(t)}
          />
        </Grid>
      </Grid>
    </div>
  );
}
