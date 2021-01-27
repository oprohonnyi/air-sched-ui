import React, {Component} from 'react';

import Loader from '../Loader';

import './index.css';


const API_URL = 'https://infinite-dawn-93085.herokuapp.com/flights';

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
            .then(response => response.json())
            .then(data => {
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
        if(timeline.length === 0) {
            this.setState({
                availFilghts: this.allFlights,
            });

            return;
        }
        
        this.setState({
            isLoading: true,
        });

        let timelineIdle = timeline.filter(frame => frame.state === 'idle'), // loop through idle frames only
            selectedFlights = timeline.map(frame => frame.id),
            availFlightsStep1 = [],
            availFlightsStep2 = [];

            // Remove flights already added to rotation
            availFlightsStep1 = this.allFlights.filter(flight => selectedFlights.indexOf(flight.id) === -1);

            // Go through idle time frames and check available flights for criteria match
            timelineIdle.forEach((frame, index) => {
                for(let i = 0; i < availFlightsStep1.length; i++) {
                    if(index === 0) {
                        // simplified check for the first idle frame
                        if(
                            availFlightsStep1[i].destination === frame.dest &&
                            availFlightsStep1[i].arrivaltime <= frame.to
                        ) {
                            availFlightsStep2.push(availFlightsStep1[i]);
                        }
                    } else if(index === timelineIdle.length - 1) {
                        // simplified check for the last idle frame
                        if(
                            availFlightsStep1[i].origin === frame.origin &&
                            availFlightsStep1[i].departuretime >= frame.from
                        ) {
                            availFlightsStep2.push(availFlightsStep1[i]);
                        }
                    } else {
                        if(
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
        const {
            availFilghts,
            isLoading,
        } = this.state;

        return (
            <div id="flights-wrapper">
                {availFilghts && availFilghts.length === 0 && 
                    <div className="info-message">
                        No Flights Matching Criteria Found.
                    </div>
                }
                {availFilghts && availFilghts.map((flight, index) => 
                    <div
                        className="flight"
                        key={`flight-${index}`}
                    >
                        <div className="col">
                            <div className="ident">{flight.id}</div>
                        </div>
                        <div className="col">
                            <div className="col">
                                <span>{flight.origin}</span>
                                <span>{flight.readable_departure}</span>
                            </div>
                            <div className="col arrow">&mdash;&rsaquo;</div>
                            <div className="col">
                                <span>{flight.destination}</span>
                                <span>{flight.readable_arrival}</span>
                            </div>
                        </div>
                        <div className="clear" />
                        <div className="actions">
                            <button
                                onClick={() => { this.onAddClick(flight); }}
                            >
                                +&nbsp;Add to Rotation
                            </button>
                        </div>
                    </div>
                )}

                { isLoading &&
                    <Loader />
                }
            </div>
        );
    }
}

export default Flights;