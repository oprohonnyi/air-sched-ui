import React, { Component } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

class Header extends Component {
  render() {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={{ pt: 2, pb: 2 }}
      >
        <Grid item>
          <Button variant="text" disabled>
            <ChevronLeftIcon />
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" variant="text" disabled>
            <CalendarTodayIcon />
            &nbsp;Tomorrow
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" disabled>
            <ChevronRightIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Header;
