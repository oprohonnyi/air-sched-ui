import React, { Component } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Header from "./components/Header";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <Container maxWidth={false}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ pl: 2, pr: 2 }}
          columns={12}
        >
          <Grid item>
            <Header />
          </Grid>
          <Grid item sx={{ width: 1 }}>
            <Content />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
