import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Message from "./Message"
import {useParams} from "react-router-dom";

import { io, Socket } from "socket.io-client";
//const socket = io("http://localhost:3001/");
const socket = io("https://tybe.herokuapp.com/");

function Messages({topicId}) {
  
  const params = useParams();
  const userId = `${params.userid} + ${topicId} `
  const id = topicId
  const [messagesList, setMessagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    //console.log(msg);
    if (msg.messageTopic === id) { //Control system
      setMessagesList([{
        messageText:msg.messageText, 
        //messageTime:"recent",
        messageReactions:msg.messageReactions,
        messageEmoLvl:msg.messageEmoLvl,
        messageTopic:msg.messageTopic, 
        messageAuthor:{_id:msg.messageAuthor, userName:msg.messageAuthorName }
        } , ...messagesList]
      );
    }
  });

  return (
    <div className="messagesList">
      {isLoading? <div>Loading ...</div> :
      messagesList.map(a => <Message messageData={a} topicId={topicId} />)
      }
    </div>
  )

}

export default Messages