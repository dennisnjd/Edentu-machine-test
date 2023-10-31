import React from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className='container-fluid ' id='cont'>

            <div className="wind col-md-9 col-xs-10">
                <div>
                    <h1>Edentu Connect</h1>

                    <div className='col-12'><Link to="/register" className="bn15 mt-5 ">SignUp</Link></div>
                    <div className='col-12'><Link to="/login" className="bn15 mt-5 ">Login</Link></div>
                </div>

            </div>
        </div>
    )
}

export default HomePage
