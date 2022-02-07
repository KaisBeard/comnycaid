import React from 'react';
import { useState, useEffect } from "react";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function ChatListItems() {
  const params = useParams();
  const id = params.userid;
  const [chatsList, setChatsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/userchats/${id}`)
      .then((response) => {
        console.log(response.data);
        setChatsList(response.data.chats);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  console.log(chatsList);

  if(isLoading===true) {
    return(<div>loading chats ...</div>)
  } else {
    return(
      <div>
        {chatsList.map(a => (<div><NavLink to={a._id}>{a.chatName}</NavLink>< br/></div>))}
      </div>
    )
  }
}