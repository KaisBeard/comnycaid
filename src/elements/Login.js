import React from 'react'
import {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


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

  console.log("GordonLogin:" + gordonLogin);

/*
  const {

  } = data; */

  /*
  const buttonForLogins= () => {
    setGordonLogin(data[0]);
    console.log(gordonLogin);
        setMaxLogin(data[1]._id);
        setAnnaLogin(data[2]._id);
        
      }*/

  if(isLoading===true) {
    return(<div>is loading ...</div>)
    } else {
      return (
        <div>
            <form>
                <label>User</label>
                <input type="text"></input>
                <label>Password</label>
                <input type="text"></input>
            </form>
            
          <NavLink to="/chatsoverview"> Login </NavLink>
          <div><NavLink to={gordonLogin}> Login Hulk </NavLink></div>
          <div><NavLink to={maxLogin}> Login Spiderman </NavLink></div>
          <div><NavLink to={annaLogin}> Login Ironman </NavLink></div>
        </div>
      )
    }
}

export default Login


//<button onClick={buttonForLogins}>set logins</button>




