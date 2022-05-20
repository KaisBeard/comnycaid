import React from 'react';
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function ChatListItems() {
  const params = useParams();
  const userId = params.userid;
  const [chatsList, setChatsList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/userchats/${userId}`)
      .then((response) => {
        //console.log(response.data);
        setChatsList(response.data.chats);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);
  
  return(
    <div>
      {isLoading? <div>Loading ...</div> :
      <div className="chatListItems"> 
        {chatsList.map(a => (<NavLink to={a._id} className="navLink chatListItem">{a.chatName}</NavLink>))}
      </div>}
    </div>
  )
  
}