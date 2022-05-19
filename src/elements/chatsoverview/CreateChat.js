import React from 'react'
import {useState} from "react";
import {useParams, NavLink} from "react-router-dom";
import axios from "axios";

//Add a way to add people!

function CreateChat() {
  const params = useParams();
  const userId = params.userid;
  const [chatName, setChatName] = useState("");
  const [newUser, setNewUser] = useState("");
  const [participants, setParticipants] = useState([userId]);
  
  const handleSubmit = (evt) => {
    try{
      evt.preventDefault();
      axios.post(`https://tybe.herokuapp.com/userchats/${userId}`, { 
        chatName:chatName, 
        chatMembers:participants,
        }, {"Access-Control-Allow-Origin": "*"}) //Access Control
      .then((response) => {
        console.log(response);
        window.location.reload(true);
        setChatName("");
        setNewUser(""); 
        window.location.href=`../../${userId}`;
      });
    } catch(err) {
      console.log(err);
    }
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    setParticipants([...participants, newUser]) 
    setNewUser("")
  }

  return (
    <div className="outerDiv">
      <header>
        <h1>Create new chat</h1>
        <NavLink to={`../${userId}`} className="navLink topRight">Go back</NavLink>
      </header>
      <div className='body'>
        <form onSubmit={addPerson} className="optionsForm">
          <label>
            Invite people to your chat
            <input
              type="text"
              value={newUser}
              onChange={e => setNewUser(e.target.value)}
            />
          </label>
          <input type="submit" value="Add Person" className='formButton'/>
        </form >
        <form onSubmit={handleSubmit}>
          <label>
            Name your chat
            <input
              type="text"
              value={chatName}
              onChange={e => setChatName(e.target.value)}
            />
          </label> 
          <input type="submit" value="Create Chat" className='formButton' />
        </form>
        <div>
          <h3>Participants in the chat:</h3>
          <ul> 
            {participants.map(a => <li>{a}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
  
}

export default CreateChat
