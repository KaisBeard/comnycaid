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
        axios.put(`https://tybe.herokuapp.com/userchats/${userid}/${id}`, { //do I need a new api to adress single chats?
          chatName:chatName,  
          //add members
          })
          .then((response) => {
          console.log(response);

          }, (error) => {
            console.log(error);
          });
        setChatName("");
      }
  
      const deleteUserFromChat = () => {
        alert(`sorry, not today!`);
        //Finish function!
      }

      const deleteChat = (evt) => {
        evt.preventDefault();
        alert(`You deleted the chat.`);
        axios.delete(`https://tybe.herokuapp.com/userchats/${userid}/${id}`, { //do I need a new api to adress single chats?
          })
          .then((response) => {
            console.log(response);
            window.location.href=`../../../${userid}`;
          }, (error) => {
            console.log(error);
          });
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
        < br />
        <input type="submit" value="Change Chat Name" />
        </form>
      <p>Members: Can't be changed yet! </p> 

      <button onClick={deleteUserFromChat}>Leave chat</button>

      <button onClick={deleteChat}>Delete chat</button>

    </div>
  )
}
}

export default ChatOptions
