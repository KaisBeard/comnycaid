import React from 'react'
import {useState, useEffect } from "react";
import Messages from "./Messages";
import Collapsible from 'react-collapsible';
import axios from "axios";
import {NavLink} from "react-router-dom";
import Keyboard from "./Keyboard";

function Topic({topicData}) {
  const topicId = topicData._id
  const [isLoading, setIsLoading] = useState(true);
  //const [topicData, setTopicData]
  const [topicDescription, setTopicDescription] = useState("Lucas ipsum dolor sit amet kit leia fisto hutt ewok fett palpatine calamari darth wookiee. Ben mandalore mon ponda lars darth. Dantooine antilles hutt aayla mace. Amidala gamorrean sidious calrissian kessel skywalker hutt alderaan.")
  console.log(topicId);
  /**/

  const {
    topicDesc,
    topicTitle
  } = topicData;
  
  //map messages
    return (
    <div>
      <div className="topicHeader">
        <h2>{topicTitle}</h2> 
        <NavLink to={`./topicoptions/${topicId}`}>Edit Topic</NavLink>
        <Collapsible trigger={topicDesc.substring(0, 35)}>
          {topicDesc.substring(35)}
        </Collapsible>
      </div>
      <div className="MessagesList">
      <Messages topicId={topicId}/>
      </div>
      <div className="keyboard">
            <Keyboard topicId={topicId}/>
          </div>
    </div>
  )
}

export default Topic





//Testpath: 61f29a7d600666078e4c6174