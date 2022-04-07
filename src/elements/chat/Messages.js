import React from 'react'
import { useState, useEffect } from "react";
//import {   Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";

import Message from "./Message"
import {useParams} from "react-router-dom";
import { io, Socket } from "socket.io-client";
const socket = io("http://localhost:3001/");
//const socket = io("https://tybe.herokuapp.com/");


function Messages({topicId}) {
  const params = useParams();
  const userId = `${params.userid} + ${topicId} ` //added topic id to user id but didnt help with the sockets
  const id = topicId
  const [messagesList, setMessagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //console.log(id);

  //const socketData = socketInput //is that needed?

  useEffect(() => {
    socket.emit('joinTopic', { authorId:userId, topicId:id });
    axios.get(`https://tybe.herokuapp.com/topicmessages/${id}`)
      .then((response) => {
        //console.log(response.data);
        setMessagesList(response.data.messages);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  socket.on('message', (msg) => {
    console.log(msg);

    if (msg.messageTopic === id) { //Control system because something in the sockets doesn't work properly
    setMessagesList([ 
      {
        messageText:msg.messageText, 
        //messageTime:"recent", //macht das probleme?
        messageReactions:msg.messageReactions,
        messageEmoLvl:msg.messageEmoLvl,
        messageTopic:msg.messageTopic, 
        messageAuthor:{_id:msg.messageAuthor, userName:msg.messageAuthorName }
      } , ...messagesList      
    ]);
  }
  });
  
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
            {messagesList.map(a => <Message messageData={a} topicId={topicId} />)}
          </div>
        )
      }
}

export default Messages





//Testpath: 61f29a7d600666078e4c6174