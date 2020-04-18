import React from "react";
import { format } from "date-fns";
import _ from "lodash";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Slider from "@material-ui/core/Slider";

import useKeyPress from "../hooks/useKeyPress";
import useTimer from "../hooks/useTimer";

const useStyles = makeStyles({
  root: {
    width: "100",
    padding: "1em 6em 1em 1em",
  },
});

export default function DateSlider({ date, setDate, dates }) {
  const classes = useStyles();
  const [isActive, toggleTimer] = useTimer({
    callback: () => {
      const { isLast } = getIndex();
      if (isActive && isLast) toggleTimer();
      // stop at the end
      else incrementDate();
    },
    active: false,
  });
  useKeyPress({
    32: () => handlePlayClick(), // space: pause/play
    37: () => handleKeyIncrement(false), // back
    39: () => handleKeyIncrement(), // forward
  });

  const handleKeyIncrement = _.throttle((forward = true) => {
    stopTimer();
    incrementDate(forward ? 1 : -1);
  }, 200);

  const getIndex = () => {
    const index = dates.map(Number).indexOf(+date);
    const isLast = index === dates.length - 1;
    return { index, isLast };
  };

  const handlePlayClick = () => {
    toggleTimer();
    if (!isActive) incrementDate();
  };

  const stopTimer = () => {
    if (isActive) toggleTimer();
  };

  const incrementDate = (increment = 1) => {
    const { index } = getIndex();
    let newIndex = index + increment;
    if (newIndex > dates.length - 1) newIndex = 0;
    if (newIndex < 0) newIndex = dates.length - 1;
    setDate(dates[newIndex]);
  };

  const getDisplayText = (ts) => format(dates[ts], "M/d");

  const handleChange = (event, newValue) => setDate(dates[newValue]);

  const { index } = getIndex();
  const max = dates.length - 1;

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
          <IconButton aria-label="delete" onClick={handlePlayClick}>
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
            valueLabelFormat={(t) => getDisplayText(t)}
            getAriaValueText={(t) => getDisplayText(t)}
          />
        </Grid>
      </Grid>
    </div>
  );
}
