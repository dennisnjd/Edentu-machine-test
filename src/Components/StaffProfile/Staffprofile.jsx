import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import "./StaffProfile.css"
import { AuthContext } from '../../AuthContext';


function Staffprofile() {
    const { state } = useContext(AuthContext);
    const token = state.token;

    const [name, setName] = useState('Luha Kp');
    const [dob, setDob] = useState('2000-10-25');
    const [mobile, setMobile] = useState('123456789');
    const [department, setDepartment] = useState('1');
    const [designation, setDesignation] = useState('1');
    const [address, setAddress] = useState('Kp House kakkad');
    const [emergencyContact, setEmergencyContact] = useState('0987654321');
    const [bloodGroup, setBloodGroup] = useState('A+');
    const [profilePicture, setProfilePicture] = useState(null);


    useEffect(() => {
        console.log("Token from useEffect create: ", token);
    }, [token])

    const handleFileChange = (e) => {
        // Store the selected file in state
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async () => {
        try {
            // Create a FormData object to send the data with the image file
            const formData = new FormData();
            formData.append('name', name);
            formData.append('dob', dob);
            formData.append('mobile', mobile);
            formData.append('department', department);
            formData.append('designation', designation);
            formData.append('address', address);
            formData.append('emergency_contact', emergencyContact);
            formData.append('blood_group', bloodGroup);
            formData.append('picture', profilePicture);

            // Make the POST request to create the staff profile
            const response = await axios.post('https://conext.in/custom_users/api/create_staff_profile/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

            // Handle the response (e.g., show a success message).
            console.log("Create staff API called succesfully");
        } catch (error) {
            // Handle errors (e.g., show an error message).
            console.log("Create staff API error: ", error);
        }
    };

    return (
        <div>
            <div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div>
                    <label>Department:</label>
                    <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div>
                    <label>Designation:</label>
                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label>Emergency Contact:</label>
                    <input type="text" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
                </div>
                <div>
                    <label>Blood Group:</label>
                    <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
                </div>
                <div>
                    <label>Profile Picture:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button onClick={handleSubmit}>Create Staff Profile</button>
            </div>
        </div>
    )
}

export default Staffprofile;
