import React from 'react'
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Topics from './Topics';
import axios from "axios";

function Chat() {
  const params = useParams();
  const userId = params.userid;
  const chatid = params.chatid;
  const [chatName, setChatName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/chattopics/${chatid}`) 
    .then((response) => {
      //console.log(response.data);
      setChatName(response.data.chat.chatName);
      setIsLoading(false);
    })
    .catch(() => console.log("request failed"));
  }, []);

  return (
    <div className="outerDiv">
      <header>
        <h1>{isLoading? "Loading ..." : chatName}</h1>
        <NavLink to={`./chatoptions`} className="navLink"> Options </NavLink>
        <NavLink to={`../${userId}`} className="navLink topRight"> Back </NavLink>
      </header>
      <Topics />
    </div>
  )
  
}

export default Chat;




