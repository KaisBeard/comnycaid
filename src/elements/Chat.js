import React from 'react'
import { useState, useEffect } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import Topics from './Topics';
import Keyboard from "./Keyboard.js"
//import axios from "axios";


function Chat() {
  const params = useParams();
  const id = params.userid
      return (
        <div>
          <header>
            <NavLink to={`../${id}`}> Go Back </NavLink>
            This is the Menu!
          </header>
          <div className="topicSwiper">
            <Topics />
          </div>
          <div className="keyboard">
            <Keyboard />
          </div>
        </div>
      )
  }
//}

export default Chat




