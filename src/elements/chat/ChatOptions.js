import React from 'react';
import {useState, useEffect} from "react";
import {useParams, NavLink} from "react-router-dom";
import axios from "axios";

function ChatOptions() {
  const params = useParams();
  const chatId = params.chatid;
  const userid = params.userid;
  const [chatName, setChatName] = useState();
  //const [chatMembers, setChatMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/chattopics/${chatId}`) 
      .then((response) => {
        console.log(response.data);
        setChatName(response.data.chat.chatName);
        setIsLoading(false);
        //setTopicsList(response.data.topics);
        //setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);


  const changeChatName = (evt) => {
    evt.preventDefault();
    axios.put(`https://tybe.herokuapp.com/userchats/${userid}/${chatId}`, {
      chatName:chatName,  
      //add members here
      })
      .then((response) => {
        //console.log(response);
        window.location.href=`../${chatId}`;
      }, (error) => {
        console.log(error);
      });
    setChatName("");
  }
      
  //leave chat
  const deleteUserFromChat = () => {
    alert(`sorry, not today! Working on it!`);
    //Finish function!
  }

  const deleteChat = (evt) => {
    evt.preventDefault();
    axios.delete(`https://tybe.herokuapp.com/userchats/${userid}/${chatId}`, {
    })
    .then((response) => {
      //console.log(response);
      window.location.href=`../`;
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div className="outerDiv">
      <header>
        <h1>Chat Settings</h1>
        <NavLink to={`../${userid}/${chatId}`} className="navLink topRight">Back</NavLink>  
      </header>
      <div className="body">
        <form onSubmit={changeChatName}>
          <label>
            New chat name:
            {isLoading? <div>Loading ... </div> :
            <input
              type="text"
              value={chatName}
              onChange={e => setChatName(e.target.value)}
            />}
          </label> 
          <input type="submit" value="Change Name" className='formButton' />
        </form>
        <div className="alignLeft">
          <p>Members:</p> 
          {/*server can't return all members of one chat yet*/}
          <p>No display yet!</p>
        </div>
        <button onClick={deleteUserFromChat} className='formButton'>Leave chat</button>
        <button onClick={deleteChat} className='formButton'>Delete chat</button>
      </div>
    </div>
  )
    
}

export default ChatOptions;
