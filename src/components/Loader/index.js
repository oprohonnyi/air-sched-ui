import React, {Component} from 'react';

import logo from './logo.svg';
import './index.css';

class Loader extends Component {
    render() {
        return (
            <div className="loader-wrapper">
                <img src={logo} className="loader" alt="loader" />
            </div>
        );
    }
}

export default Loader;