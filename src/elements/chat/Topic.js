import React from 'react'
//import { useState } from "react";
import Messages from "./Messages";
import Collapsible from 'react-collapsible';
import { NavLink } from "react-router-dom";
import Keyboard from "./Keyboard";

function Topic({topicData}) {

  const {
    topicDesc,
    topicTitle,
    _id
  } = topicData;

  return (
    <div className="topicFrame">
      <div className="topicHeader">
        <div className="topicHeaderPartOne">
          <h2>{topicTitle}</h2> 
          <NavLink to={`./topicoptions/${_id}`} className="navLink topRight">Edit</NavLink>
        </div>
        <Collapsible trigger={topicDesc.substring(0, 35)} className="topicHeaderPartTwo" >
          {topicDesc.substring(35)}
        </Collapsible>
      </div>
      <div className="messageKeyboardFlex">
        <Messages 
          topicId={_id}
        />
        <Keyboard topicId={_id}/>
      </div>
    </div>
  )

}

export default Topic;