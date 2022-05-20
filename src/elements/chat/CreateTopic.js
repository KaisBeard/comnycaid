import React from 'react'
import { useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function CreateTopic() {
  const params = useParams();
  const chatId = params.chatid;
  const [topicTitle, setTopicTitle] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post(`https://tybe.herokuapp.com/chattopics/${chatId}`, {
      topicTitle:topicTitle,
      topicDesc:topicDesc,
      chatId:chatId 
      })
      .then((response) => {
        //console.log(response);
        window.location.reload(true);
      }, (error) => {
        console.log(error);
      });
    setTopicTitle("");
    setTopicDesc("");
  }

  return (
    <div className="body">
      <h2>Create a new Topic ... </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={topicTitle}
            onChange={e => setTopicTitle(e.target.value)}
          />
        </label> <br />
        <label>
          Description
          <input
            type="text"
            value={topicDesc}
            onChange={e => setTopicDesc(e.target.value)}
          />
        </label>
        <input type="submit" value="CREATE" className='formButton'/>
      </form>
    </div>
  )
  
}

export default CreateTopic
