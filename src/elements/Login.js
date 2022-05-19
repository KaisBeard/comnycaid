import React from 'react'
import {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Logo from "../graphics/tybe_logo.png"

function Login() {
  const [isLoading, setIsLoading] = useState(true)
  const [gordonLogin, setGordonLogin] = useState("")
  const [maxLogin, setMaxLogin] = useState("")
  const [annaLogin, setAnnaLogin] = useState("")
  const [data, setData] = useState()

  useEffect(() => {
    axios.get('https://tybe.herokuapp.com/user') 
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setGordonLogin(response.data.data[1]._id);
        setMaxLogin(response.data.data[0]._id);
        setAnnaLogin(response.data.data[2]._id);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  if(isLoading===true) {
    return(<div>is loading ...</div>)
    } else {
      return (
        <div className="body">
          <img src={Logo} className="tybeLogo" />

          {/* Login field
            <form>
                <label>User</label>
                <input type="text"></input>
                <label>Password</label>
                <input type="text"></input>
            </form>
          <NavLink to="/chatsoverview"> Login </NavLink>
          */}

          <div>
            <h2>Trial logins</h2>
            <div><NavLink to={maxLogin}> Login Spiderman </NavLink></div>
            <div><NavLink to={gordonLogin}> Login Ironman </NavLink></div>
            <div><NavLink to={annaLogin}> Login Hulk </NavLink></div>
          </div>
          <div>This is optimized for mobile only. On a bigger screen you may encounter problems with the layout.</div>
        </div>
      )
    }
}

export default Login




