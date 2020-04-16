import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function Header() {
  const preventDefault = event => event.preventDefault();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="body2" component="h2">
          By{" "}
          <Link href="https://github.com/jamstooks/" onClick={preventDefault}>
            @jamstooks
          </Link>
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          aria-label="github"
          color="primary"
          href="https://github.com/jamstooks/covid-timeline/"
        >
          <GitHubIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
