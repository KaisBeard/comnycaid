import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Outlet, NavLink } from "react-router-dom";
import ChatsListItems from "./ChatsListItems";

//put the thing on a sublevel or leave it on a toplevel?

function ChatsList() {
    return (
      <div>
        <header>
          This is the Menu!
        </header>
        <div>
          <div className="chatslist">
            <NavLink to="/chat">
              This is one chat!
            </NavLink> <br />
          </div>
          <ChatsListItems />
          <button className="newChatButton">
            Start a new chat here!
          </button>
        </div>
      </div>
    )
}


export default ChatsList;
