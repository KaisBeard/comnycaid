import React from 'react'
import {useState, useEffect } from "react";
import Messages from "./Messages";
import Collapsible from 'react-collapsible';
import axios from "axios";
import {NavLink, useParams} from "react-router-dom";
import Keyboard from "./Keyboard";

function Topic({topicData}) {
  const params = useParams();
  const userId = params.userid;
  const topicId = topicData._id;
  const [isLoading, setIsLoading] = useState(true);
  //const [topicData, setTopicData]
  const [topicDescription, setTopicDescription] = useState("");
  console.log(topicId);
  const [socketInput, setSocketInput] = useState([])
  console.log(userId)

  const {
    topicDesc,
    topicTitle
  } = topicData;
  
  /* 
  const scrollToBottom = (target) => {
    target.scrollTop = target.scrollHeight;
  }*/

    return (
    <div className="topicFrame">
      <div className="topicHeader">
        <div className="topicHeaderPartOne">
          <h2>{topicTitle}</h2> 
          <NavLink to={`./topicoptions/${topicId}`} className="navLink">Edit</NavLink>
        </div>
        <Collapsible trigger={topicDesc.substring(0, 35)} className="topicHeaderPartTwo" >
          {topicDesc.substring(35)}
        </Collapsible>
      </div>
      
        <Messages 
          topicId={topicId}
        />
      <Keyboard topicId={topicId}/>
    </div>
  )
}

export default Topic





//Testpath: 61f29a7d600666078e4c6174