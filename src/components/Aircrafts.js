import React, { Component } from "react";

import Container from "@mui/material/Container";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";

const API_URL = "https://infinite-dawn-93085.herokuapp.com/aircrafts";

class Aircrafts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      aircrafts: [],
    };

    this.onDefineClick = this.onDefineClick.bind(this);
  }

  componentDidMount() {
    const { onAircraftSelect } = this.props;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // select first from the list by default
        onAircraftSelect(data.data[0]);

        this.setState({
          aircrafts: data.data || [],
          isLoading: false,
        });
      });
  }

  onDefineClick(plane) {
    // eslint-disable-next-line
    const { onAircraftSelect } = this.props;

    /**
     * @todo implement
     * out of scope for poc
     */
    // onAircraftSelect(plane);
  }

  render() {
    const { aircrafts, isLoading } = this.state;

    const { utilization } = this.props;

    return (
      <Container>
        {aircrafts &&
          !isLoading &&
          aircrafts.map((plane, index) => (
            <Card variant="outlined" key={`plane-${index}`} sx={{ mb: 1 }}>
              <CardContent>
                <Typography variant="h6" component="p">
                  {plane.ident}
                  {index === 0 && (
                    <>
                      &nbsp;&nbsp;&nbsp;
                      <Chip label={utilization + "%"} color="primary" />
                    </>
                  )}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Type:&nbsp;{plane.type}
                  &nbsp;&nbsp; Seats:&nbsp;{plane.economySeats}
                  &nbsp;&nbsp; Base:&nbsp;{plane.base}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    this.onDefineClick(plane);
                  }}
                  disabled
                >
                  <ConnectingAirportsIcon />
                  &nbsp;Define Rotation
                </Button>
              </CardActions>
            </Card>
          ))}

        {isLoading && (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}

export default Aircrafts;
