import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./Login.css"
import { Link } from 'react-router-dom';

import { AuthContext } from '../../AuthContext';


function Login() {
    const [email, setEmail] = useState(''); // Assuming email is used as a username
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    // const [token, setToken] = useState('');

    const { setToken } = useContext(AuthContext);



    const handleLogin = async () => {
        try {
            const response = await axios.post('https://conext.in/custom_users/api/login/', {
                username: email,
                password: password,
            });
            // Handle the login response here, e.g., store the token or user information in your app's state.
            console.log("Login API called succesfully");
            const token = response.data.token;
            token ? console.log("Token is : ", token) : console.log("No token");
            token ? setIsLogged(true) : setIsLogged(false);

            setToken(token);
        } catch (error) {
            // Handle login errors here (e.g., show an error message).
            console.log("Login API not called");
            alert("Wrong credentilas")
        }
    }

    return (
        <div className='container-fluid' id='registerCont'>
            <div className="contain col-md-6 col-xs-10">

            <h1>Login</h1>


                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
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
                            <button className='mt-4 btn' onClick={handleLogin}>Login</button>

                        )
                }


                <div className="row mt-5">
                    <div className='ms-2 col-4'>
                        <Link to={"/updateprofile"}>  <button className='btn2'>Update profile</button>
                        </Link>
                    </div>

                    <div className='ms-2 col-4' >
                        <Link to={"/create"}>  <button className='btn2'>Add details</button>
                        </Link>
                    </div>

                    <div className='ms-2 col-4'>
                        <Link to={"/reset"}>  <button className='btn2'>Reset password</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
