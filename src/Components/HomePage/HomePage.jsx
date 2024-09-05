import React from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className='container-fluid ' id='cont'>

            <div className="wind row col-md-11 col-xs-10">
                <div className='wind2 col-md-5 col-xs-12'>

                </div>
                <div className='col-md-7 col-xs-12'>
                    <h1 className='h1Home' style={{ textAlign: "center" }}>EDENTU CONNECT</h1>

                    <p className='parag mt-4'>"A Comprehensive , all encompassing solution you could ever get for<br /> an adaptive & technology integrated learning experience through out <br /> your journey from BDS to NEET MDS</p>
                    <hr className='mt-3' />
                    <div className='col-12'><Link to="/register" className="bn15 mt-md-5 mt-xs-3 ">SignUp</Link></div>
                    <div className='col-12'><Link to="/login" className="bn15 mt-3 ">Login</Link></div>
                </div>



            </div>

        </div>
    )
}

export default HomePage
