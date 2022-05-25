import React, { Component } from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const API_URL = "https://infinite-dawn-93085.herokuapp.com/flights";

class Flights extends Component {
  constructor(props) {
    super(props);

    this.allFlights = [];

    this.state = {
      isLoading: true,
      availFilghts: [],
    };

    this.filterFlightsList = this.filterFlightsList.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  componentDidMount() {
    const { setTimelineUpdateListener } = this.props;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // store all flights list received from server
        this.allFlights = data.data;

        // add observer for timeline change to not recalculate values in 2 places
        setTimelineUpdateListener(this.filterFlightsList);

        this.setState({
          availFilghts: data.data || [],
          isLoading: false,
        });
      });
  }

  /**
   * @todo refactor
   * left as is to save time for poc
   */
  filterFlightsList(timeline) {
    if (timeline.length === 0) {
      this.setState({
        availFilghts: this.allFlights,
      });

      return;
    }

    this.setState({
      isLoading: true,
    });

    let timelineIdle = timeline.filter((frame) => frame.state === "idle"), // loop through idle frames only
      selectedFlights = timeline.map((frame) => frame.id),
      availFlightsStep1 = [],
      availFlightsStep2 = [];

    // Remove flights already added to rotation
    availFlightsStep1 = this.allFlights.filter(
      (flight) => selectedFlights.indexOf(flight.id) === -1
    );

    // Go through idle time frames and check available flights for criteria match
    timelineIdle.forEach((frame, index) => {
      for (let i = 0; i < availFlightsStep1.length; i++) {
        if (index === 0) {
          // simplified check for the first idle frame
          if (
            availFlightsStep1[i].destination === frame.dest &&
            availFlightsStep1[i].arrivaltime <= frame.to
          ) {
            availFlightsStep2.push(availFlightsStep1[i]);
          }
        } else if (index === timelineIdle.length - 1) {
          // simplified check for the last idle frame
          if (
            availFlightsStep1[i].origin === frame.origin &&
            availFlightsStep1[i].departuretime >= frame.from
          ) {
            availFlightsStep2.push(availFlightsStep1[i]);
          }
        } else {
          if (
            availFlightsStep1[i].origin === frame.origin &&
            availFlightsStep1[i].destination === frame.dest &&
            availFlightsStep1[i].departuretime >= frame.from &&
            availFlightsStep1[i].arrivaltime <= frame.to
          ) {
            availFlightsStep2.push(availFlightsStep1[i]);
          }
        }
      }
    });

    this.setState({
      isLoading: false,
      availFilghts: availFlightsStep2,
    });
  }

  onAddClick(flight) {
    const { onFlightSelect } = this.props;

    onFlightSelect(flight);
  }

  render() {
    const { availFilghts, isLoading } = this.state;

    return (
      <Container>
        {availFilghts && availFilghts.length === 0 && !isLoading && (
          <Alert variant="outlined" severity="info">
            No flights matching criteria found.
          </Alert>
        )}
        {availFilghts &&
          !isLoading &&
          availFilghts.map((flight, index) => (
            <Card variant="outlined" sx={{ mb: 1 }} key={`flight-${index}`}>
              <CardContent>
                <Typography variant="h6" component="p">
                  {flight.id}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <Box sx={{ mr: 4, float: "left" }}>
                    {flight.origin}&nbsp;(
                    {flight.readable_departure})
                  </Box>
                  <Box sx={{ mr: 4, float: "left" }}>
                    <ArrowRightAltIcon />
                  </Box>
                  <Box>
                    {flight.destination}&nbsp;(
                    {flight.readable_arrival})
                  </Box>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    this.onAddClick(flight);
                  }}
                >
                  <AddIcon />
                  &nbsp;Add to Rotation
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

export default Flights;
