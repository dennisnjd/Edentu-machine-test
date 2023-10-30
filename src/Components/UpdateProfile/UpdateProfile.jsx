import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import "./UpdateProfile.css"
import { AuthContext } from '../../AuthContext';

function UpdateProfile() {
  const { state } = useContext(AuthContext);
  const token = state.token;


  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');

  useEffect(() => {
    console.log("Token from useEffect update: ", token);
  }, [token])

  const handleUpdateProfile = () => {

    // Define the headers with the Authorization header
    const headers = {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    };

    // Define the data to update the profile
    const data = {
      name: name,
      designation:designation,
      // Add other profile fields as needed
    };

    // Send the PUT request with the headers and data
    axios.put('https://conext.in/custom_users/api/update-profile/', data, { headers })
      .then(response => {
        // Handle the response, e.g., show a success message
        console.log("Update API called");
      })
      .catch(error => {
        // Handle errors, e.g., show an error message
        console.log("Update API error: ",error);

      });
  }



  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}

export default UpdateProfile;
