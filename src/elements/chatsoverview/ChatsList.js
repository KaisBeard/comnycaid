import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";
import ChatsListItems from "./ChatsListItems";

//put the thing on a sublevel or leave it on a toplevel?

function ChatsList() {
  const params = useParams();
  const id = params.userid
    return (
      <div>
        <header>
          <h1>Chats</h1> 
          <NavLink to={`../`}>
            Log out
          </NavLink>
          <NavLink to={`./userprofile`}>
            Profile
          </NavLink>
        </header>
        <div>
          <div className="chatslist">
          </div>
          <ChatsListItems />
          <NavLink to={`/${id}/newchat`} className="newChatButton">
            Start a new chat here!
          </NavLink>
        </div>
      </div>
    )
}


export default ChatsList;
