import React from 'react'
import {useState} from "react";
import {useParams, NavLink} from "react-router-dom";
import axios from "axios";

//How do I add people by name instead of by id? Do I need to GET the userdata from the backend?

function CreateChat() {
    const params = useParams();
    const id = params.userid;
    const [chatName, setChatName] = useState("");
    const [newUser, setNewUser] = useState("");
    const [participants, setParticipants] = useState([id]);
    
    const handleSubmit = (evt) => {
      try{
        evt.preventDefault();
        alert(`You created a new chat: ${chatName}. The participants are ${participants}`);
        axios.post(`https://tybe.herokuapp.com/userchats/${id}`, { 
          chatName:chatName, 
          chatMembers:participants,
          }, {"Access-Control-Allow-Origin": "*"})
          .then((response) => {
            console.log(response);
            window.location.reload(true);
            setChatName("");
            setNewUser(""); //put to end
          } /*, (error) => {
            console.log(error);
          }*/);} catch(err) {
            console.log(err);
          }

      }

      const addPerson = (evt) => {
        evt.preventDefault();
        setParticipants([...participants, newUser]) 
        setNewUser("")
      }

  return (
    <div>
      <h1>Create a new chat here!</h1>

      <form onSubmit={addPerson}>
        <label>
          Invite people to your chat: 
          <input
            type="text"
              value={newUser}
              onChange={e => setNewUser(e.target.value)}
            />
        </label>
        <input type="submit" value="add" />
      </form >

        <br />

      <form onSubmit={handleSubmit}>
        <label>
          Name your chat:
          <input
            type="text"
            value={chatName}
            onChange={e => setChatName(e.target.value)}
          />
        </label> 
        <input type="submit" value="Create chat" />
      </form>
      <h3>Participants in the chat:</h3>
      <ul> 
      {participants.map(a => <li>{a}</li>)}
      </ul>
      <div><NavLink to={`../${id}`}>Go back</NavLink></div>
    </div>
    
  )
}

export default CreateChat
