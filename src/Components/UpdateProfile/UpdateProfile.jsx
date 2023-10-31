import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import "./UpdateProfile.css"
import { AuthContext } from '../../AuthContext';

function UpdateProfile() {
  const { state } = useContext(AuthContext);
  const token = state.token;


  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    console.log("Token from useEffect update: ", token);
  }, [token])

  const handleUpdateProfile = () => {

    const headers = {
      'Authorization': `Token ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    // Data to update the profile
    const data = {
      name: name,
      designation: designation,
      // Add other profile fields as needed
    };

    //PUT request with the headers and data
    axios.put('https://conext.in/custom_users/api/update-profile/', data, { headers })
      .then(response => {

        console.log("Update API called");
        setIsUpdated(true);
      })
      .catch(error => {
        console.log("Update API error: ", error);

      });
  }



  return (
    <div className='container-fluid' id='updateCont'>
      <div className='updateField'>
        <h1>Update Profile</h1>
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
        {
          isUpdated ? (
            <button className='mt-5 btn3' >Updated <i className="fa-sharp fa-solid fa-check fa-xl"></i></button>

          ) : (
            <button className='mt-5 btn3' onClick={handleUpdateProfile}>Update Profile</button>

          )
        }

      </div>
    </div>
  );
}

export default UpdateProfile;
