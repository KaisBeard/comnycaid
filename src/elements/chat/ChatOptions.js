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
        axios.put(`https://tybe.herokuapp.com/userchats/${userid}/${id}`, { //do I need a new api to adress single chats?
          chatName:chatName,  
          //add members
          })
          .then((response) => {
          console.log(response);
          window.location.href=`../../${userid}/${id}`;
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
        axios.delete(`https://tybe.herokuapp.com/userchats/${userid}/${id}`, { //do I need a new api to adress single chats?
          })
          .then((response) => {
            console.log(response);
            window.location.href=`../../../${userid}`;
          }, (error) => {
            console.log(error);
          });
      }

    if(isLoading) {
        return(<div> loading ... </div>)
    } else {
      return (
        <div className="outerDiv">
            <header>
              <h1>Chat Settings</h1>
              <NavLink to={`../${userid}/${id}`} className="navLink">Back</NavLink>  
            </header>

            <div className="body">
              <form onSubmit={handleSubmit}>
                <label>
                  New chat name:
                  <input
                    type="text"
                    value={chatName}
                    onChange={e => setChatName(e.target.value)}
                  />
                </label> 
                <input type="submit" value="Change Name" className='formButton' />
              </form>

            <p>Members: Can't be changed yet! </p> 

            <button onClick={deleteUserFromChat} className='formButton'>Leave chat</button>
            <button onClick={deleteChat} className='formButton'>Delete chat</button>
          </div>
        </div>
      )
    }
}

export default ChatOptions
