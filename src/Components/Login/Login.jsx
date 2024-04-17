import React, { useState, useContext } from 'react';
import axios from 'axios';
import "./Login.css"
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import { AuthContext } from '../../AuthContext';


function Login() {
    const [email, setEmail] = useState(''); // Assuming email is used as a username
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const { setToken } = useContext(AuthContext);



    const handleLogin = async () => {
        try {
            const response = await axios.post('https://removed/', {
                username: email,
                password: password,
            });
            console.log("Login API called succesfully");
            const token = response.data.token;
            token ? console.log("Token is : ", token) : console.log("No token");
            token ? setIsLogged(true) : setIsLogged(false);

            setToken(token);
        } catch (error) {
            console.log("Login API not called");
            alert("Wrong credentilas")
        }
    }

    return (
        <>
            <Navbar />

            <div className='container-fluid' id='loginCont'>


                <div className="contain row col-md-10 col-xs-12">

                    <div className=' login1 col-md-6 col-xs-12'>

                        <h1 className='h1'>Welcome back...</h1>
                        <h2 className='h2'>Login</h2>


                        <div className='mt-3'>
                            <input
                                className='inp'
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className='inp'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {
                                isLogged ? (
                                    <button className='mt-4 btn' >Succesfull<i className="fa-sharp fa-solid fa-check fa-xl"></i></button>
                                ) :
                                    (
                                        <button className='mt-4 btnlog' onClick={handleLogin}>Login</button>

                                    )
                            }
                            <div className='col-12 mt-5'>
                                <a href="https://play.google.com/store/search?q=edentu&c=apps&hl=en&gl=US" target="_blank" tabIndex="0"><img className="bn45" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="bn45" /></a>
                                <a href=" https://apps.apple.com/us/app/edentu/id1624471043" target="_blank" tabIndex="0"><img className="bn46 ml-md-4 ml-sm-5" src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="bn45" /></a>
                            </div>
                        </div>
                    </div>



                    <div className='login2 col-md-5 col-xs-12'>

                    </div>

                </div>
            </div >
        </>
    );
}

export default Login;
