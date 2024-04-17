import axios from 'axios';
import React, { useState } from 'react';
import Navbar from "../Navbar/Navbar"
import "./ForgetPassword.css"

function App() {
    const [email, setEmail] = useState('');
    const [isOtpGet, setIsOtpGet] = useState(false)
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    // Function to handle OTP request
    const handleGetOTP = async () => {
        setOtpLoading(true);
        try {
            const response = await axios.post('https://removed/', `email_address=${email}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });


            // Handle the response, e.g., show a success message
            console.log('Get OTP API called successfully', response);
            if (response.data.status == true)
                setIsOtpGet(true);
            else
                alert("No account found with this email id")

        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Get OTP API error:', error);
        } finally {
            setOtpLoading(false)
        }
    };


    //function to verify OTP
    const handleVerifyOTP = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('otp', otp);
            formData.append('email_address', email);
            const response2 = await axios.post('https://removed/', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });


            if (response2.data && response2.data.status == true) {
                setOtpVerified(true);
                console.log("Verified");
            } else {
                console.error('OTP verification failed');
            }
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Verify OTP API error:', error);
        }
    }

    //function to handle password reset
    const handleResetPassword = async () => {
        setResetLoading(true);
        try {
            const resetFormData = new URLSearchParams();
            resetFormData.append('email_address', email);
            resetFormData.append('otp', otp);
            resetFormData.append('new_password', password);

            const resetResponse = await axios.post('https://removed/', resetFormData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            if (resetResponse.data && resetResponse.data.message === 'Password reset successfully') {
                setResetSuccess(true);
                console.log('Password reset successfully');
            } else {
                console.error('Password reset failed');
            }
        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Password reset error:', error);
        } finally {
            setResetLoading(false);
        }

    }

    return (
        <>
            <Navbar />
            <div className='container-fluid' id='forgetCOnt'>
                <div className="forgetField col-md-8">
                    <h1 style={{ color: "black", textAlign: "center" }}>Password Reset</h1>
                    <p className='paraReset mt-2'>Forgot your password?<br />
                        Don't worry; you can reset your password here!</p>
                    <div className='imgCont col-12'>
                        <div className='fingimg col-md-4 col-xs-8'>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            placeholder="Enter your email"
                        />
                        {
                            isOtpGet ? (
                                <button className='mt-2 btnReset btn-success'>OTP Sent</button>
                            ) :
                                otpLoading ? (
                                    <button className='mt-2 btnReset btn-info'>Sending <i className="fa-solid fa-spinner fa-spin"></i></button>

                                )
                                    : (
                                        <button className='mt-2 btnReset' onClick={handleGetOTP}>Get OTP</button>

                                    )
                        }
                    </div>

                    <div>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                            }}
                            placeholder="Enter OTP"
                        />
                        {
                            otpVerified ? (
                                <button className='mt-2 btnReset btn-success' >Verified</button>

                            ) : (
                                <button className='mt-2 btnReset' onClick={handleVerifyOTP}>Verify OTP</button>

                            )
                        }

                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Enter new password"
                        />
                        <div>
                            {
                                resetSuccess ? (
                                    <button className='mt-2 btn btn-success' >Done <i className="fa-sharp fa-solid fa-check fa-xl"></i></button>

                                ) :
                                    resetLoading ? (
                                        <button className='mt-2 btnReset btn-info'> <i className="fa-solid fa-spinner fa-spin"></i></button>
                                    ) : (
                                        <button className='mt-3 btn' onClick={handleResetPassword}>Reset Password</button>

                                    )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
