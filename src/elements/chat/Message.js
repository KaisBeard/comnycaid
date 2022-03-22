import React from 'react'
import axios from "axios"; 
import {useParams} from "react-router-dom";


function Message({messageData, topicId}) {
  const params = useParams();
  const id = params.chatid;

  const createNewTopic = () => {
    axios.post(`https://tybe.herokuapp.com/chattopics/${id}`, {
        topicTitle:`answer to ${messageData.messageAuthor.userName} `,
        topicDesc:`${messageText.substring(0, 50)}`,
        chatId:id //does is work that way? Will it recognize it's an id?
        })
        .then((response) => {
        //console.log(response.data.data._id);
        addMessageToTopic(response.data.data._id)
        window.location.reload(true);
        }, (error) => {
          console.log(error);
        });}
    
  const addMessageToTopic = (theTopicId) => {
    axios.post(`https://tybe.herokuapp.com/topicmessages/${topicId}`, { //how do I know the topicId??
      messageText:messageText, 
      messageTime:messageTime,
      messageReactions:messageReactions,
      messageEmoLvl:messageEmoLvl,
      messageTopic:theTopicId, //where do I get the topicId?
      messageAuthor:messageData.messageAuthor._id
      })
      .then((response) => {
      //console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

  const {
    messageEmoLvl,
    messageReactions,
    messageText,
    messageTime
  } = messageData
  
    return (
      
        <div className={`messageFrame emotionLevel${messageEmoLvl} `}>
         <div className="messageHeader">
          <h3>{messageData.messageAuthor.userName}</h3>
          <p>{messageTime}</p>          
        </div>
        <div className="messageText">{messageText}</div>
        <button onClick={createNewTopic} className="answerButton"> 
          Answer
          </button>
          </div>
  )
}

export default Message


