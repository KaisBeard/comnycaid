import React from 'react'
import {useState} from "react";
import { useSwiperSlide } from 'swiper/react'; //right place?
import { io, Socket } from "socket.io-client";
import axios from "axios";
import {useParams} from "react-router-dom";

function Keyboard(topicId) {
    const params = useParams();
    const authorId = params.userid; 
    const [chatInput, setChatInput] = useState("");
    const [id, setId] = useState(topicId) //Needs to be fixed!
    const [messageEmoLvl, setMessageEmoLvl] = useState(1) 
    //const socket = io("http://localhost:3001/");
    //socket.emit("Message", `${chatOutput}`)

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Message: ${chatInput}`);
        // socket.emit('chat message', chatInput);

        axios.post(`https://tybe.herokuapp.com/topicmessages/${id}`, { //how do I access the chat id?
          messageText:chatInput,
          messageTime:Date.now(),
          messageReactions:"",
          messageEmoLvl:messageEmoLvl,
          messageTopic:id, //does it work that way? Will it recognize it's an id?
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
    <div>
        <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
        />
      </label>
      <br />
      <label>
        <input
          type="range" min="0" max="5"
          value={messageEmoLvl}
          onChange={e => setMessageEmoLvl(e.target.value)}
        />
      </label>
      <input type="submit" value="Send" />
    </form>
    </div>
  )
}

export default Keyboard
