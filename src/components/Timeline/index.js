import React, { Component } from "react";

import "./index.css";

/** @obsolete */

const TURNAROUND_TIME = 1200; // 20min * 60
const DAY_TIME = 86400; // 24hrs * 60 * 60

const DAY_TIME_STEP = 864; // seconds per 1 percent in 0-100 scale
const TURNAROUND_TIME_COEF = 1.4; // TURNAROUND_TIME / DAY_TIME_STEP

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeline: [],
    };

    this.parseFlightsToTimeline = this.parseFlightsToTimeline.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.timestamp !== prevProps.timestamp) {
      this.parseFlightsToTimeline(this.props.flights);
    }
  }

  /**
   * @todo refactor
   * left as is to save time for poc
   */
  parseFlightsToTimeline(flights) {
    const { updateListener } = this.props;

    let timeline = [];

    // Go through selected flights and collect criteria for Timeline, Flights components logic
    for (let i = 0; i < flights.length; i++) {
      if (i === 0 && flights[i].departuretime > 0) {
        timeline.push({
          state: "idle",
          from: 0,
          to: flights[i].departuretime - TURNAROUND_TIME,
          width: Math.floor(flights[i].departuretime / DAY_TIME_STEP),
          id: null,
          origin: null,
          dest: flights[i].origin,
        });
      }

      if (
        i !== 0 &&
        flights[i].departuretime !== timeline[timeline.length - 1].to
      ) {
        timeline.push({
          state: "idle",
          from: timeline[timeline.length - 1].to + TURNAROUND_TIME,
          to: flights[i].departuretime + TURNAROUND_TIME,
          width: Math.floor(
            (flights[i].departuretime - timeline[timeline.length - 1].to) /
              DAY_TIME_STEP
          ),
          id: null,
          origin: flights[i - 1].destination,
          dest: flights[i + 1] ? flights[i].origin : null,
        });
      }

      timeline.push({
        state: "sched",
        from: flights[i].departuretime,
        to: flights[i].arrivaltime,
        width: Math.floor(
          (flights[i].arrivaltime - flights[i].departuretime) / DAY_TIME_STEP
        ),
        id: flights[i].id,
        origin: flights[i].origin,
        dest: flights[i].destination,
      });

      if (i !== flights.length - 1) {
        timeline.push({
          state: "turn",
          from: flights[i].arrivaltime,
          to: flights[i].arrivaltime + TURNAROUND_TIME,
          width: TURNAROUND_TIME_COEF,
          id: null,
          origin: flights[i].origin,
          dest: flights[i].origin,
        });
      } else {
        timeline.push({
          state: "idle",
          from: flights[i].arrivaltime + TURNAROUND_TIME,
          to: DAY_TIME,
          width: Math.floor(
            (DAY_TIME - flights[i].arrivaltime) / DAY_TIME_STEP
          ),
          id: null,
          origin: flights[i].destination,
          dest: null,
        });
      }
    }

    this.setState(
      {
        timeline,
      },
      () => {
        if (updateListener) {
          updateListener(timeline);
        }
      }
    );
  }

  render() {
    const { timeline } = this.state;

    return (
      <div id="timeline-wrapper">
        <div className="scale">
          {timeline &&
            timeline.map((frame, index) => (
              <div
                key={`time-frame-${index}`}
                className={frame.state}
                style={{ width: frame.width + "%" }}
              />
            ))}
        </div>
        <div className="story">
          <div className="marks">
            <div>|</div>
            <div>|</div>
            <div>|</div>
          </div>
          <div className="marks">
            <div>00:00</div>
            <div>12:00</div>
            <div>23:59</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
