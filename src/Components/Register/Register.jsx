import React, { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import { useNavigate } from "react-router-dom";


function AuthComponent() {
    const [email, setEmail] = useState('');
    const [org, setOrg] = useState(''); // Assuming org is constant.
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [verifyEmail, setverifyEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();


    // Verify the email id by sending OTP
    const handleVerifyEmail = async () => {
        try {
            const verifyEmailResponse = await axios.post('https://conext.in/custom_users/api/verify_email/', {
                email_address: email,
                org,
            });
            // Handling the response from email verification
            console.log("Verify API called: ", verifyEmailResponse.data);
            if (verifyEmailResponse.data.status == true) {
                setverifyEmail(true)
            }
            else
                alert("Wrong Email id")

            // //Extract the OTP from the response and prompt the user to enter it.
            // const receivedOTP = verifyEmailResponse.data.otp;
            // setOtp(receivedOTP);
        } catch (error) {
            console.log("Verify email failed : ", error);
            alert("Use valid email id")
            setverifyEmail(false)
        }
    }

    const handleRegisterUser = async () => {
        setIsLoading(true);

        try {
            // Register the user with the provided OTP
            const registrationResponse = await axios.post('https://conext.in/custom_users/api/register/', {
                email,
                password,
                organization: org,
                otp,
            });
            console.log("Registration API called.");
            navigate('/login');
        } catch (error) {
            setIsLoading(false);
            console.log("Error in registration API");
            
        }
    }

    return (
        <div className='container-fluid' id='registerCont'>
            <div className="containn col-md-8 col-xs-10">

                <h1 className='h11' style={{ color: "black" }}>Create your account</h1>
                <p className='paraReg mt-4'>
                    <span style={{ fontWeight: "700" }}>"Unlock a world of knowledge and start your e-learning journey today!"</span>

                    <br />
                    note: Use your official mail id for registration</p>
                <div>
                    <div className='mt-3'>
                        <input
                            className='col-xs-10'

                            type="text"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type="text"
                            placeholder="Organization"
                            value={org}
                            onChange={(e) => setOrg(e.target.value)}
                        /></div>
                    {verifyEmail ? (
                        <button className='mt-2 btn' >OTP sent <i className="fa-sharp fa-solid fa-check fa-xl"></i></button>

                    ) :
                        (
                            <button className='mt-2 btn' onClick={handleVerifyEmail}>Verify Email</button>

                        )
                    }


                </div>

                <div className='mt-5'>
                    <div className='mt-3'>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {
                        isLoading ? (
                            <button className='mt-2 mb-3 btn'>Signing up  <i className="fa-solid fa-spinner fa-spin"></i> </button>

                        ) : (
                            <button className='mt-2 mb-3 btn' onClick={handleRegisterUser}>Register </button>

                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default AuthComponent;
