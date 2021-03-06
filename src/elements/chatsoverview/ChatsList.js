import React from 'react';
//import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ChatsListItems from "./ChatsListItems";

function ChatsList() {
  const params = useParams();
  const userId = params.userid

  return (
    <div className="outerDiv">
      <header>
        <h1>Chats</h1> 
        <NavLink to={`./userprofile`} className="navLink topRight">
          Profile
        </NavLink>
      </header>
      <div className="chatslist">
        <ChatsListItems />
      </div>
      <NavLink to={`/${userId}/newchat`} className="newChatButton navLink">
        Start a new chat
      </NavLink>
    </div>
  )
  
}

export default ChatsList;
