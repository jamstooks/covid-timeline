import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import Container from "@material-ui/core/Container";

export default function Header() {
  return (
    <Container maxWidth="lg">
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
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={3}
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
  );
}
