import React from 'react'
import axios from "axios"; 
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

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
        console.log(response.data.data._id);
        addMessageToTopic(response.data.data._id)
        //reloadWindow(response.data.data._id);
    
        setTimeout(function () { //this aint pretty but await didn't work for some reason
          window.location.reload(true)
        }, 50)
        
        }, (error) => {
          console.log(error);
        })
        //.then (() => {
        //  reloadWindow();
        //  window.location.reload(true);
        //  });
        }

        /*
        const reloadWindow = async (data) => {
         addMessageToTopic(data)   
        .then(window.location.reload(true))
        }*/

  const addMessageToTopic = (theTopicId) => {
    axios.post(`https://tybe.herokuapp.com/topicmessages/${topicId}`, { //how do I know the topicId??
      messageText:messageText, 
      //messageTime:messageTime,
      messageReactions:messageReactions,
      messageEmoLvl:messageEmoLvl,
      messageTopic:theTopicId, //where do I get the topicId?
      messageAuthor:messageData.messageAuthor._id
      })
      .then((response) => {
      console.log(response);
      }, (error) => {
        console.log(error);
      });
  }


  const transformDate = (date) => {
    date.slice(11, 24)
  }

  const transformTime = (date) => {

  }

  const {
    messageEmoLvl,
    messageReactions,
    messageText,
    createdAt
  } = messageData

    
  //console.log(createdAt + " typ " + typeof createdAt)
  const [time, setTime] = useState(new Date (`${messageData.createdAt}`))
  const [isLoading, setIsLoading] = useState(true)
  const [year, setYear] = useState(``);
  const [month, setMonth] = useState(``);
  const [day, setDay] = useState(``)
  const [hours, setHours] = useState(``);
  const [minutes, setMinutes] = useState(``);
  const [displayedTime, setDisplayedTime] = useState(``)

  useEffect(() => {
    //setTime(Date.parse(new Date (`${messageData.createdAt}`)))
    console.log(time)
    
    setYear(time.getFullYear())
    setMonth(("0" + (time.getMonth() + 1)).slice(-2))
    setDay(("0" + time.getDate()).slice(-2))
    setHours(("0" + time.getHours()).slice(-2))
    setMinutes(("0" + time.getMinutes()).slice(-2))
  
    //setTime(time.substring(11, 16))
    //setTime(createdAt.toLocaleDateString())
    //console.log("time: "+ time)
    //setDate(date.substring(0, 10))
    setIsLoading(false)
    //console.log("date cropped")
  }, [])

    return (
        <div className={`messageFrame emotionLevel${messageEmoLvl} `}>
          <div className="messageHeader">
            <h3>{messageData.messageAuthor.userName}</h3>
            {isLoading ? <div> loading ... </div> : <p> {`${day}.${month}.${year} `} </p> }   
            {isLoading ? <div> loading ... </div> : <p> {`${hours}:${minutes}`} </p> }         
          </div>
          <div className="messageText">{messageText}</div>
          <button onClick={createNewTopic} className="answerButton"> 
            ANSWER
          </button>
        </div>
  )
}

export default Message


