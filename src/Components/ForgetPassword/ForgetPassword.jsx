import axios from 'axios';
import React, { useState } from 'react';
import "./ForgetPassword.css"

function App() {
    const [email, setEmail] = useState('');
    const [isOtpGet, setIsOtpGet] = useState(false)
    const [otp, setOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');

    // Function to handle OTP request
    const handleGetOTP = async () => {
        try {
            const response = await axios.post('https://conext.in/custom_users/api/forgot_password/', `email_address=${email}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });


            // Handle the response, e.g., show a success message
            console.log('Get OTP API called successfully', response);
            setIsOtpGet(true);

        } catch (error) {
            // Handle errors, e.g., show an error message
            console.error('Get OTP API error:', error);
        }
    };


    //function to verify OTP
    const handleVerifyOTP = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('otp', otp);
            formData.append('email_address', email);
            const response2 = await axios.post('https://conext.in/custom_users/api/verify_otp/', formData, {
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
        try {
            const resetFormData = new URLSearchParams();
            resetFormData.append('email_address', email);
            resetFormData.append('otp', otp);
            resetFormData.append('new_password', password);

            const resetResponse = await axios.post('https://conext.in/custom_users/api/reset_password/', resetFormData, {
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
        }

    }

    return (
        <div className='container-fluid' id='forgetCOnt'>
            <div className="forgetField col-md-6">
                <h1>Reset Password</h1>
                <div>
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
                            <button className='mt-2 btnSuc'>OTP Sent</button>
                        ) : (
                            <button className='mt-2' onClick={handleGetOTP}>Get OTP</button>

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
                            <button className='mt-2 btnSuc' >Verified</button>

                        ) : (
                            <button className='mt-2' onClick={handleVerifyOTP}>Verify OTP</button>

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
                    {
                        resetSuccess ? (
                            <button className='mt-2 btn' >Done <i className="fa-sharp fa-solid fa-check fa-xl"></i></button>

                        ) : (
                            <button className='mt-2' onClick={handleResetPassword}>Reset Password</button>

                        )
                    }

                </div>
            </div>
        </div>
    );
}

export default App;
