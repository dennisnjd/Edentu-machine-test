import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "./Login.css"
import { Link } from 'react-router-dom';

import { AuthContext } from '../../AuthContext';


function Login() {
    const [email, setEmail] = useState(''); // Assuming email is used as a username
    const [password, setPassword] = useState('');
    // const [token, setToken] = useState('');

    const { setToken } = useContext(AuthContext);


    // useEffect(() => {
    //     console.log("Token is:", token);
    // }, [token]);


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

            setToken(token);
        } catch (error) {
            // Handle login errors here (e.g., show an error message).
            console.log("Login API not called");
        }
    }

    return (
        <div>
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
            <button onClick={handleLogin}>Login</button>

            <div>
              <Link to={"/updateprofile"}>  <button >Update profile</button>
                </Link>
            </div>

            <div>
              <Link to={"/create"}>  <button >Add details</button>
                </Link>
            </div>

            <div>
              <Link to={"/reset"}>  <button >Reset password</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
