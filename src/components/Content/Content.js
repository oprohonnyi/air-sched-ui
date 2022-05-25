import React, { Component } from 'react';

import Grid from '@mui/material/Grid';

import Aircrafts from '../Aircrafts';
import Rotation from '../Rotation';
import Timeline from '../Timeline';
import Flights from '../Flights';

const TURNAROUND_TIME = 1200; // 20min, 1200 sec
const DAY_TIME = 86400; // 24 hours, 86400 sec

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aircraftIdent: '',
      utilization: 0,
      rotation: [],
      timelineUpdateListener: null,
    };

    this.onAircraftSelect = this.onAircraftSelect.bind(this);
    this.onFlightSelect = this.onFlightSelect.bind(this);
    this.onFlightRemove = this.onFlightRemove.bind(this);
    this.setTimelineUpdateListener = this.setTimelineUpdateListener.bind(this);
  }

  onAircraftSelect(aircraft) {
    this.setState({
      aircraftIdent: aircraft.ident || '',
      utilization: 0,
      rotation: [],
      timelineUpdateListener: null,
    });
  }

  onFlightSelect(flight) {
    let { rotation } = this.state;

    let utilization = 0;

    rotation.push(flight);

    // sort flights in asc order by departure time
    rotation.sort((a, b) => (a.departuretime > b.departuretime ? 1 : -1));

    utilization = this._getUtilizationForRotation(rotation);

    this.setState({
      rotation,
      utilization,
    });
  }

  onFlightRemove(flight) {
    const { rotation } = this.state;

    let newRotation = [],
      utilization = 0;

    for (let i = 0; i < rotation.length; i++) {
      if (rotation[i].id !== flight.id) {
        newRotation.push(rotation[i]);
      } else {
        if (i !== 0 && i !== rotation.length - 1) {
          // all flights in rotation following deleted should be removed to prevent "teleport" issue
          break;
        }
      }
    }

    utilization = this._getUtilizationForRotation(newRotation);

    this.setState({
      rotation: newRotation,
      utilization,
    });
  }

  setTimelineUpdateListener(observer) {
    this.setState({
      timelineUpdateListener: observer,
    });
  }

  _getUtilizationForRotation(rotation) {
    let totalTime = 0,
      utilization = 0;

    if (rotation.length !== 0) {
      // total time scheduled
      for (let i = 0; i < rotation.length; i++) {
        totalTime += rotation[i].arrivaltime - rotation[i].departuretime;
      }

      // total time turnaround
      totalTime += TURNAROUND_TIME * (rotation.length - 1);

      utilization = Math.floor((totalTime * 100) / DAY_TIME);
    }

    return utilization;
  }

  render() {
    const {
      utilization,
      aircraftIdent,
      rotation,
      timelineUpdateListener,
    } = this.state;

    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        columns={12}
        spacing={2}
      >
        <Grid item xs={3}>
          <Grid item>AIRCRAFTS</Grid>
          <Grid item>
            <Aircrafts
              utilization={utilization}
              onAircraftSelect={this.onAircraftSelect}
            />
          </Grid>
        </Grid>
        <Grid container item direction="column" spacing={2} xs={6}>
          <Grid item>
            ROTATION:&nbsp;<span>{aircraftIdent}</span>
          </Grid>
          <Grid item>
            <Rotation flights={rotation} onFlightRemove={this.onFlightRemove} />
          </Grid>
          <Grid item>
            <Timeline
              timestamp={Date.now()}
              flights={rotation}
              updateListener={timelineUpdateListener}
            />
          </Grid>
        </Grid>
        <Grid container item xs={3}>
          <Grid item>FLIGHTS</Grid>
          <Grid item>
            <Flights
              onFlightSelect={this.onFlightSelect}
              setTimelineUpdateListener={this.setTimelineUpdateListener}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Content;
