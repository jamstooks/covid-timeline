import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { colors } from "../theme";
import { footerBackground } from "../theme/background";

const useStyles = makeStyles({
  footer: {
    color: colors.cases[13],
    backgroundColor: colors.cases[0],
    backgroundImage: footerBackground(),
    padding: "1em 0",
    margin: 0,
    fontSize: ".9em",
    marginTop: "1vh",
  },
});

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              aria-label="github"
              color="primary"
              href="https://github.com/jamstooks/covid-timeline/"
            >
              <GitHubIcon />
            </IconButton>
            <Link href="https://github.com/jamstooks/covid-timeline/">
              @jamstooks
            </Link>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
            >
              <Grid item>
                <Typography>Data Sources:</Typography>
              </Grid>
              <Grid item>
                <Link href="https://github.com/nytimes/covid-19-data">
                  NY Times (U.S.)
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://github.com/CSSEGISandData/COVID-19">
                  Johns Hopkins (Global)
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
