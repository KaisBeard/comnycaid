import React from 'react'
import Textarea from 'react-expanding-textarea'
import {useState, useEffect, useCallback, useRef} from "react";
import { useSwiperSlide } from 'swiper/react'; //right place?
import MicIcon from "../../graphics/icon_mic.png"
import LocIcon from "../../graphics/icon_location.png"
import MetIcon from "../../graphics/icon_metro.png"
import CamIcon from "../../graphics/icon_camera.png"
import axios from "axios";
import {useParams} from "react-router-dom";

import { io, Socket } from "socket.io-client";
//const socket = io("http://localhost:3001/");
const socket = io("https://tybe.herokuapp.com/");

function Keyboard(topicId) {
  const params = useParams();
  const authorId = params.userid;
  const [authorName, setAuthorName] = useState("");
  const chatId = params.chatid; 
  const [chatInput, setChatInput] = useState("");
  const [tId, setTId] = useState(topicId.topicId) //Needs to be fixed!
  const [messageEmoLvl, setMessageEmoLvl] = useState(1) 
  //socket.emit("Message", `${chatOutput}`)
    
  useEffect(() => { //get the data of the author from the server
    axios.get(`https://tybe.herokuapp.com/userchats/${authorId}`)
      .then((response) => {
        //console.log(response.data);
        setAuthorName(response.data.user.userName);
      })
      .catch(() => console.log("request failed"));
  }, []);

  useEffect(() => { //send new message in real time with sockets
    socket.emit('joinTopic', { authorId:authorId, topicId:tId });
  }, [])

  //Submits the new message
  const handleSubmit = (evt) => {
    evt.preventDefault();
    socket.emit('chatMessage', {
      messageText:chatInput, 
      messageTime:Date.now(),
      messageReactions:"",
      messageEmoLvl:messageEmoLvl,
      messageTopic:topicId.topicId, 
      messageAuthor:authorId,
      messageAuthorName:authorName
    });

    //Send new message to server
    axios.post(`https://tybe.herokuapp.com/topicmessages/${tId}`, { 
      messageText:chatInput, 
      //messageTime:Date.now(),
      messageReactions:"",
      messageEmoLvl:messageEmoLvl,
      messageTopic:topicId.topicId, 
      messageAuthor:authorId
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
          
    //Updating the topic to get the correct order
    axios.put(`https://tybe.herokuapp.com/chattopics/${chatId}/${tId}`, {
      updatedAt:new Date().toISOString()
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

    setChatInput("")
  }

  const textareaRef = useRef(null) // needed for expanding textfield

  //Send message on Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  }

  return (
    <div className="keyboard">
      <form onSubmit={handleSubmit}>
        <label className="textPreview">
          <Textarea
            value={chatInput}
            
            id="my-textarea"
            maxLength="1000"
            onChange={e => setChatInput(e.target.value)}
            placeholder="Say something .."
            ref={textareaRef}
            onKeyDown={e => handleKeyDown(e)} 
          />
        </label>
        <div className="keyBoardGrid1"><img src={MicIcon}/></div>
        <div className="keyBoardGrid2"><img src={MetIcon}/></div>
        <div className="keyBoardGrid3"><img src={CamIcon}/></div>
        <input type="submit" value="SEND" className="keyboardSubmit keyBoardInput" />
      </form>
    </div>
  )

}

export default Keyboard


/* an Input for an emotionlevel in the message, not enabled right now
<label>
          <input
            className="inputRange"
            type="range" min="0" max="5"
            value={messageEmoLvl}
            onChange={e => setMessageEmoLvl(e.target.value)}  
          />
        </label>

*/