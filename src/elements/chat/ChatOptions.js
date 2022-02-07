import React from 'react';
import {useState, useEffect} from "react";
import {useParams, NavLink} from "react-router-dom";
import axios from "axios";
//server can't display all members of one chat!


function ChatOptions() {
    const params = useParams();
    const id = params.chatid;
    const userid = params.userid;
    const [chatName, setChatName] = useState();
    //const [chatMembers, setChatMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://tybe.herokuapp.com/chattopics/${id}`) 
          .then((response) => {
            console.log(response.data);
            setChatName(response.data.chat.chatName);
            setIsLoading(false);
            //setTopicsList(response.data.topics);
            //setIsLoading(false);
          })
          .catch(() => console.log("request failed"));
      }, []);

      const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`You edited a chat: ${chatName}.`);
        axios.put(`https://tybe.herokuapp.com/userchats/${id}`, { //do I need a new api to adress single chats?
          chatName:chatName,  
          })
          .then((response) => {
            console.log(response);

          }, (error) => {
            console.log(error);
          });
        setChatName("");

      }
  
    if(isLoading){
        return(
            <div> loading ... </div>
        )
    } else {
    return (
    <div>
        <header>
            <NavLink to={`../${userid}/${id}`}>Back to the chat</NavLink>
        </header>
      <h1>Welcome to the chatoptions!</h1>

      <p>Name: {chatName}</p>
      <form onSubmit={handleSubmit}>
        <label>
          New chat name:
          <input
            type="text"
            value={chatName}
            onChange={e => setChatName(e.target.value)}
          />
        </label> 
        </form>
        <input type="submit" value="Change Chat Name" />
      

      <p>Members: Can't be changed yet! </p> 
    </div>
  )
}
}

export default ChatOptions
