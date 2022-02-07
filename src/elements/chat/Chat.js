import React from 'react'
import { useState, useEffect } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import Topics from './Topics';
import Keyboard from "./Keyboard.js"
import axios from "axios";


function Chat() {
  const params = useParams();
  const id = params.userid;
  const chatid = params.chatid;
  const [chatName, setChatName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/chattopics/${chatid}`) 
      .then((response) => {
        console.log(response.data);
        setChatName(response.data.chat.chatName);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

    if(isLoading===true) {
      return(
        <div>loading chat ...</div>
      ) } else {

      return (
        <div>
          <header>
            <NavLink to={`../${id}`}> Go Back </NavLink>
            <h1>{chatName}</h1>
            <NavLink to={`./chatoptions`}> Chat Options </NavLink>
          </header>
          <div className="topicSwiper">
            <Topics />
          </div>
          
        </div>
      )
  }
}

export default Chat




