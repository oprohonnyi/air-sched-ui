import React, {Component} from 'react';

import Loader from '../Loader';

import './index.css';

const API_URL = 'https://infinite-dawn-93085.herokuapp.com/aircrafts';

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
            .then(response => response.json())
            .then(data => {
                // select first from the list by default
                onAircraftSelect(data.data[0]);

                this.setState({
                    aircrafts: data.data || [],
                    isLoading: false,
                });
            });
    }

    onDefineClick(plane) {
        const { onAircraftSelect } = this.props;

        /**
         * @todo implement
         * out of scope for poc
         */
        // onAircraftSelect(plane);
    }

    render() {
        const {
            aircrafts,
            isLoading,
        } = this.state;

        const {
            utilization,
        } = this.props;

        return (
            <div id="aircrafts-wrapper">
                {aircrafts && aircrafts.map((plane, index) => 
                    <div
                        className={(index === 0) ? 'aircraft selected' : 'aircraft'}
                        key={`plane-${index}`}
                    >
                        <div className="col">
                            <div className="ident">{plane.ident}</div>
                            <div className="spec">
                                <span>Type:&nbsp;{plane.type}</span>
                                <span>Seats:&nbsp;{plane.economySeats}</span>
                                <span>Base:&nbsp;{plane.base}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="utilisation">{utilization}%</div>
                        </div>
                        <div className="actions">
                            <button
                                onClick={() => { this.onDefineClick(plane); }}
                                disabled={true}
                            >
                                &gt;&nbsp;Define Rotation
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

export default Aircrafts;