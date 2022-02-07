import React from 'react'
import axios from "axios"; 
import {useParams} from "react-router-dom";


function Message({messageData}) {
  const params = useParams();
  const id = params.chatid;

  const createNewTopic = () => {
    axios.post(`https://tybe.herokuapp.com/chattopics/${id}`, {
        topicTitle:`answer to ${messageData.messageAuthor.userName} `,
        topicDesc:`${messageText.substring(0, 35)}`,
        chatId:id //does is work that way? Will it recognize it's an id?
        })
        .then((response) => {
        console.log(response);
        window.location.reload(true);
        }, (error) => {
          console.log(error);
        });
        
        /*
    axios.post(`https://tybe.herokuapp.com/topicmessages/${id}`, {
        topicTitle:`answer to ${messageData.messageAuthor.userName} `,
        topicDesc:`${messageText.substring(0, 35)}`,
        chatId:id //does is work that way? Will it recognize it's an id?
        })
        .then((response) => {
        console.log(response);
        }, (error) => {
          console.log(error);
        }); */
  }


  const {
    messageEmoLvl,
    messageReactions,
    messageText,
    messageTime
  } = messageData
  
    return (
    <div>
      <h3>{messageData.messageAuthor.userName}</h3> 
      <p>{messageTime}</p>
      <p>{messageText}</p>
      <button onClick={createNewTopic}> 
        Answer
      </button>
    </div>
  )
}

export default Message
