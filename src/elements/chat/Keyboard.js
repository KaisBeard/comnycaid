import React from 'react'
import {useState, useEffect} from "react";
import { useSwiperSlide } from 'swiper/react'; //right place?
import { io, Socket } from "socket.io-client";
import axios from "axios";
import {useParams} from "react-router-dom";
const socket = io("http://localhost:3001/");
//const socket = io("https://tybe.herokuapp.com/");

function Keyboard(topicId) {
    const params = useParams();
    const authorId = params.userid;
    const [authorName, setAuthorName] = useState("Hello author");
    const chatId = params.chatid; 
    const [chatInput, setChatInput] = useState("");
    const [id, setId] = useState(topicId.topicId) //Needs to be fixed!
    const [messageEmoLvl, setMessageEmoLvl] = useState(1) 
    //socket.emit("Message", `${chatOutput}`)
    
    useEffect(() => {
      axios.get(`https://tybe.herokuapp.com/userchats/${authorId}`)
        .then((response) => {
          console.log(response.data);
          setAuthorName(response.data.user.userName);
          //setIsLoading(false);
        })
        .catch(() => console.log("request failed"));
    }, []);

    useEffect(() => {
      socket.emit('joinTopic', { authorId:"keyboard", topicId:id }); //authorId
    }, [])

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

        axios.post(`https://tybe.herokuapp.com/topicmessages/${id}`, { //tybe.herokuapp.com
          messageText:chatInput, 
          messageTime:Date.now(),
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

        setChatInput("")
    }
   
  return (
    <div className="keyboard">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="keyBoardInput"
            type="text"
            placeholder="Write message ..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
          />
        </label>
        
        <label>
          <input
            className="inputRange"
            type="range" min="0" max="5"
            value={messageEmoLvl}
            onChange={e => setMessageEmoLvl(e.target.value)}  
          />
        </label>
        <input type="submit" value="Send" className="inputField keyBoardInput" />
      </form>
    </div>
  )
}

export default Keyboard
