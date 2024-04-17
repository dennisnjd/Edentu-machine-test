import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import "./StaffProfile.css"
import { AuthContext } from '../../AuthContext';
import Navbar from "../Navbar/Navbar";



function Staffprofile() {
    const { state } = useContext(AuthContext);
    const token = state.token;

    const [name, setName] = useState('');
    const [dob, setDob] = useState('2000-10-25');
    const [mobile, setMobile] = useState('123456789');
    const [department, setDepartment] = useState('1');
    const [designation, setDesignation] = useState('1');
    const [address, setAddress] = useState('Kp House kakkad');
    const [emergencyContact, setEmergencyContact] = useState('0987654321');
    const [bloodGroup, setBloodGroup] = useState('A+');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDetails, setIsDetails] = useState(false);


    useEffect(() => {
        console.log("Token from useEffect create: ", token);
    }, [token])

    const handleFileChange = (e) => {
        // Store the selected file in state
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            // FormData object to send the data with the image file
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

            // POST request to create the staff profile
            const response = await axios.post('https://removed/', formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Create staff API called succesfully");
            setIsDetails(true);

        } catch (error) {
            console.log("Create staff API error: ", error);
            alert("Profile already added.")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <>
            <Navbar />
            <div className='container-fluid' id='registerCont'>
                <div className="containn col-md-8 col-xs-10">

                    <h1 className='h11' style={{ color: "black" }}>Add Details to your account</h1>
                    <p className='paraReg mt-4'>
                        <span style={{ fontWeight: "700" }}>
                            "Congratulations, your journey in our e-learning community has begun! We can't wait to help you unlock a world of knowledge and growth."</span>

                    </p>
                    <div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                value={name}
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input type="date"
                                value={dob}
                                placeholder='DOB'
                                onChange={(e) => setDob(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input type="text"
                                value={mobile}
                                placeholder='Mobile Number'
                                onChange={(e) => setMobile(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                placeholder='Department'
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                value={designation}
                                placeholder='Designation'
                                onChange={(e) => setDesignation(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                value={address}
                                placeholder='Address'
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                value={emergencyContact}
                                placeholder='Emergency Contact'
                                onChange={(e) => setEmergencyContact(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                value={bloodGroup}
                                placeholder='Blood Group'
                                onChange={(e) => setBloodGroup(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <input
                                type="file"
                                placeholder='Profile Picture'
                                onChange={handleFileChange} />
                        </div>
                        <div>
                            {
                                isDetails ? (
                                    <button className='mt-2 btn' >Profile addded <i className="fa-sharp fa-solid fa-check fa-xl"></i></button>

                                ) : isLoading ? (
                                    <button className='mt-2 btn' >Adding <i className="fa-solid fa-spinner fa-spin"></i></button>
                                ) : (
                                    <button className='mt-2 mb-3 btn' onClick={handleSubmit}>Create Staff Profile</button>


                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Staffprofile;
