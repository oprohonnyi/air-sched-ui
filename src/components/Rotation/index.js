import React, {Component} from 'react';

import './index.css';

class Rotation extends Component {
    render() {
        const { flights, onFlightRemove } = this.props;

        return (
            <div id="rotation-wrapper">
                {flights && flights.length === 0 && 
                    <div className="info-message">
                        No Flights Have Been Added to the Rotation Yet.
                    </div>
                }
                {flights && flights.map((flight, index) => 
                    <div
                        className="rotation"
                        key={`flight-${index}`}
                    >
                        <div className="col ident">
                            Flight: <span>{flight.id}</span>
                        </div>
                        <div className="col actions">
                            <button
                                onClick={() => { onFlightRemove(flight); }}
                            >
                                &times;&nbsp;Remove from Rotation
                            </button>
                        </div>
                        <div className="clear" />
                        <div className="route">
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
                    </div>
                )}
            </div>
        );
    }
}

export default Rotation;