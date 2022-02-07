import React from 'react';
import {NavLink} from "react-router-dom";
import { useParams } from "react-router-dom";

function UserProfile() {
    const params = useParams();
    const id = params.userid
  return (
    <div>
        <header>
          <h1>User Profile</h1> 
          <NavLink to={`../${id}`}>
            back
          </NavLink>
        </header>
      Change your profile information here!
    </div>
  )
}

export default UserProfile
