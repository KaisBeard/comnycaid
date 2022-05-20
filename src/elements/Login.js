import React from 'react'
import {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Logo from "../graphics/tybe_logo.png"

function Login() {
  const [isLoading, setIsLoading] = useState(true)
  const [ironmanLogin, setIronmanLogin] = useState("")
  const [spidermanLogin, setSpidermanLogin] = useState("")
  const [hulkLogin, setHulkLogin] = useState("")
  const [data, setData] = useState()

  useEffect(() => {
    axios.get('https://tybe.herokuapp.com/user') 
      .then((response) => {
        //console.log(response.data);
        setData(response.data);
        setHulkLogin(response.data.data[1]._id);
        setSpidermanLogin(response.data.data[0]._id);
        setIronmanLogin(response.data.data[2]._id);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

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
        {
        isLoading? <div>loading ...</div> : <div>
        <div><NavLink to={spidermanLogin}> Login Spiderman </NavLink></div>
        <div><NavLink to={hulkLogin}> Login Hulk </NavLink></div>
        <div><NavLink to={ironmanLogin}> Login Ironman </NavLink></div>
        </div>
        }
      </div>
      <div>This is optimized for mobile only. On a bigger screen you may encounter problems with the layout.</div>
    </div>
  )
  
}

export default Login;




