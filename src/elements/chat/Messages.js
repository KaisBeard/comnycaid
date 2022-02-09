import React from 'react'
import { useState, useEffect } from "react";
//import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";

import Message from "./Message"
import {useParams} from "react-router-dom";

//const socket = io("https://tybe.herokuapp.com/");


function Messages({topicId, messageList}) {
  const params = useParams();
  const userId = params.userid
  const id = topicId
  //const [messagesList, setMessagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(messageList)
  //console.log(id);

  //const socketData = socketInput //is that needed?

  /*useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/topicmessages/${id}`)
      .then((response) => {
        //console.log(response.data);
        setMessagesList(response.data.messages);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);*/
  
  //console.log(messagesList); doesnt log anything

  //{socketInput ==! null ? socketInput.map(a => <Message messageData={a}/>) : <></>}

  //console.log(messagesList)

    if(isLoading === true) {
      return (
        <div>loading messages ...</div>
      )
    } else {
        return (
          <div className="messagesList">
            {messageList.map(a => <Message messageData={a} topicId={topicId} />)}
            
          </div>
        )
      }
}

export default Messages





//Testpath: 61f29a7d600666078e4c6174