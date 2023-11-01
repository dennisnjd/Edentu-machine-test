import React from 'react'
import { Link } from 'react-router-dom';
import "../Chart/GatePassVisualisation.css"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/login">
                        <span className="large-font">Login</span>
                    </Link>
                    <Link className="nav-item nav-link" to="/create">
                        <span className="large-font">Add Details</span>
                    </Link>
                    <Link className="nav-item nav-link" to="/updateprofile">
                        <span className="large-font">Update Profile</span>
                    </Link>
                    <Link className="nav-item nav-link" to="/reset">
                        <span className="large-font">Reset Password</span>
                    </Link>
                    <Link className="nav-item nav-link" to="/chart">
                        <span className="large-font">Gate Pass Chart</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;