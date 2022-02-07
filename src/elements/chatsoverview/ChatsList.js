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
          This is the Menu!
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
