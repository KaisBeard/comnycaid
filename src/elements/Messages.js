import React from 'react'
import { useState, useEffect } from "react";
//import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";

import Message from "./Message"

function Messages({topicId}) {
  const id = topicId
  const [messagesList, setMessagesList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/topicmessages/${id}`) // + id Testpath: 61f29200600666078e41b678
      .then((response) => {
        console.log(response.data);
        setMessagesList(response.data.messages);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  console.log(messagesList);


    if(isLoading === true) {
      return (
        <div>loading messages ...</div>
      )
    } else {
        return (
          <div>
            {messagesList.map(a => <Message messageData={a} />)}
            
          </div>
        )
      }
}

export default Messages





//Testpath: 61f29a7d600666078e4c6174