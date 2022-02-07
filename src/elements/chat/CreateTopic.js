import React from 'react'
import { useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function CreateTopic() {
    const params = useParams();
    const id = params.chatid;
    const [topicTitle, setTopicTitle] = useState("");
    const [topicDesc, setTopicDesc] = useState("");
    //How do I save the chat's Id? Params?
    //Add first message?
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`You created a new topic: ${topicTitle} with the description: ${topicDesc}`);
        axios.post(`https://tybe.herokuapp.com/chattopics/${id}`, {
          topicTitle:topicTitle,
          topicDesc:topicDesc,
          chatId:id //does is work that way? Will it recognize it's an id?
          })
          .then((response) => {
            console.log(response);
            window.location.reload(true);
          }, (error) => {
            console.log(error);
          });
        setTopicTitle("");
        setTopicDesc("");
      }

  return (
    <div>
      <h2>Create new Topic ... </h2>
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
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

export default CreateTopic
