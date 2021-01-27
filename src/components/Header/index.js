import React, {Component} from 'react';

import './index.css';

class Header extends Component {
    render() {
        return (
            <nav className="header-wrapper">
                <div className="date-selector">
                    <button
                        disabled={true}
                    >
                        &lt;
                    </button>
                    <span>Tomorrow</span>
                    <button
                        disabled={true}
                    >
                        &gt;
                    </button>
                </div>
            </nav>
        );
    }
}

export default Header;