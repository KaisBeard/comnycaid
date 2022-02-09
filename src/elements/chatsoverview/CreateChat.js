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
        axios.post(`https://tybe.herokuapp.com/userchats/${id}`, { 
          chatName:chatName, 
          chatMembers:participants,
          }, {"Access-Control-Allow-Origin": "*"})
          .then((response) => {
            console.log(response);
            window.location.reload(true);
            setChatName("");
            setNewUser(""); 
            window.location.href=`../../../${id}`;
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
    <div className="outerDiv">
      <header>
        <h1>Create new chat</h1>
        <NavLink to={`../${id}`} className="navLink">Go back</NavLink>
      </header>
      
      <div className='body'>
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

        <form onSubmit={addPerson}>
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
