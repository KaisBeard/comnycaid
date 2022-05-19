import React from 'react';
import {NavLink} from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function UserProfile() {
  const params = useParams();
  const userId = params.userid;
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/userchats/${userId}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.user);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  return (
    <div className="outerDiv">
      <header>
        <h1>Profile</h1> 
        <NavLink to={`../${userId}`} className="navLink topRight"> back </NavLink>          
      </header>
      <div className='body'>
        {isLoading? <div> Loading ... </div> : 
        <div>
          <div className="userData">
            <div>
              <h2>E-mail:</h2>
              <p> {userData.userEmail} </p>
            </div>
            <div>
              <h2>Username:</h2>
              <p> {userData.userName} </p>
            </div>
            <div>
              <h2>Phone Number:</h2>
              <p> {userData.userPhone}</p>
            </div>
            <div>
              <h2>Userid:</h2>
              <p> {userData._id}</p>
            </div>
          </div>
        </div>
        }
        <NavLink to={`../../`} className="navLink">
          Log out
        </NavLink>
      </div>
    </div>
  )
  
}

export default UserProfile;
