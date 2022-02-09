import React from 'react';
import {NavLink} from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function UserProfile() {
    const params = useParams();
    const id = params.userid;
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      axios.get(`https://tybe.herokuapp.com/userchats/${id}`)
        .then((response) => {
          console.log(response.data);
          setUserData(response.data.user);
          setIsLoading(false);
          
        })
        .catch(() => console.log("request failed"));
    }, []);

  
    
  

  /*  
  const {
            userEmail,
            userName,
            userPhone,
            _id
          } = userData

  if(isLoading===true) {
      return(
        <div>loading ...</div>
      )
    } else {} */

  return (
    <div className="outerDiv">
        <header>
          <h1>Profile</h1> 
          <NavLink to={`../${id}`} className="navLink">
            back
          </NavLink>          
        </header>
        <div className='body'>
        {isLoading? "loading ..." : 
        <div>
          <p>Your E-mail: {userData.userEmail} </p>
          <p>Your Username: {userData.userName} </p>
          <p>Your Phone Number: {userData.userPhone}</p>
          <p>Your Userid: {userData._id}</p>
        </div>
        }
        
        <NavLink to={`../../`} className="navLink">
          Log out
        </NavLink>
        </div>
    </div>
  )
}

export default UserProfile
