import React from 'react'
import { useState } from "react";

function CreateTopic() {
    const [topicTitle, setTopicTitle] = useState("");
    const [topicDesc, setTopicDesc] = useState("");
    //How do I save the chat's Id? Params?
    //Add first message?
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`You created a new topic: ${topicTitle} with the description: ${topicDesc}`);
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
