import React, { useState } from 'react';
import axios from 'axios';

function AuthComponent() {
    const [email, setEmail] = useState('');
    const [org, setOrg] = useState('1'); // Assuming org is constant.
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');

    const handleVerifyEmail = async () => {
        try {
            // Step 1: Verify the email
            const verifyEmailResponse = await axios.post('https://conext.in/custom_users/api/verify_email/', {
                email_address: email,
                org,
            });

            // Step 2: Handle the response from email verification (e.g., display a message).
            console.log("Verify API called: ",verifyEmailResponse.data);

            // You can extract the OTP from the response and prompt the user to enter it.
            const receivedOTP = verifyEmailResponse.data.otp;
            setOtp(receivedOTP);
        } catch (error) {
            console.log("Verify email failed : ",error);
        }
    }

    const handleRegisterUser = async () => {
        try {
            // Step 3: Register the user with the provided OTP
            const registrationResponse = await axios.post('https://conext.in/custom_users/api/register/', {
                email,
                password,
                organization: org,
                otp,
            });

            // Step 4: Handle the response from user registration (e.g., show a success message or proceed with user authentication).
            console.log("Registration API called.");
        } catch (error) {
            // Handle errors here (e.g., show an error message).
            console.log("Error in registration API");
        }
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Organization"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                />
                <button onClick={handleVerifyEmail}>Verify Email</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleRegisterUser}>Register User</button>
            </div>
        </div>
    );
}

export default AuthComponent;
