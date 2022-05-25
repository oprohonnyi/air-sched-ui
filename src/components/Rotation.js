import React, { Component } from "react";

import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

class Rotation extends Component {
  render() {
    const { flights, onFlightRemove } = this.props;

    return (
      <Container sx={{ mt: 2 }}>
        {flights && flights.length === 0 && (
          <Alert variant="outlined" severity="info">
            No flights have been added to the rotation yet.
          </Alert>
        )}
        {flights &&
          flights.map((flight, index) => (
            <Card variant="outlined" sx={{ mb: 1 }} key={`rotation-${index}`}>
              <CardContent>
                <Typography variant="h6" component="p">
                  Flight:&nbsp;{flight.id}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, pt: 1 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <Box sx={{ mr: 6, float: "left" }}>
                    <FlightTakeoffIcon />
                    &nbsp;&nbsp;{flight.origin}&nbsp;(
                    {flight.readable_departure})
                  </Box>
                  <Box sx={{ mr: 6, float: "left" }}>
                    <ArrowRightAltIcon />
                  </Box>
                  <Box>
                    <FlightLandIcon />
                    &nbsp;&nbsp;{flight.destination}&nbsp;(
                    {flight.readable_arrival})
                  </Box>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    onFlightRemove(flight);
                  }}
                >
                  <DeleteOutlineIcon />
                  &nbsp;Remove from Rotation
                </Button>
              </CardActions>
            </Card>
          ))}
      </Container>
    );
  }
}

export default Rotation;
