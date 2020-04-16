import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import { colors } from "../theme";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    minWidth: 344,
    padding: "1em"
  },
  quote: {
    fontStyle: "italic",
    marginBottom: "1em"
  },
  right: {
    textAlign: "right"
  },
  trump: {
    textAlign: "right",
    color: colors.deaths[13]
  }
}));

const EventMessage = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const { date, person, quote, source } = JSON.parse(props.message);

  return (
    <Card className={classes.card} ref={ref} variant="outlined">
      <Typography gutterBottom variant="h5" component="h2" color="primary">
        {format(new Date(date), "MMMM do")}
      </Typography>
      <Typography className={classes.quote} gutterBottom>
        "{quote}"
      </Typography>
      <Typography className={classes.trump}>{person}</Typography>
      <Typography
        className={classes.right}
        color="textSecondary"
        variant="caption"
        display="block"
      >
        {source}
      </Typography>
    </Card>
  );
});

EventMessage.propTypes = {
  id: PropTypes.number.isRequired
};

export default EventMessage;
