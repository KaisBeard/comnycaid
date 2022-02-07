import React from 'react'
import {useState, useEffect} from "react";
import {useParams, NavLink} from "react-router-dom";
import axios from "axios";

function TopicOptions() {
    const params = useParams();
    const id = params.topicid;
    const userid = params.userid;
    const [topicTitle, setTopicTitle] = useState("dummytopicname");
    const [topicDesc, setTopicDesc] = useState("dummytopicdesc");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://tybe.herokuapp.com/topicmessages/${id}`) //do I need the id of a specific topic here?
          .then((response) => {
            console.log(response.data);
            setTopicTitle(response.data.topic.topicTitle)
            setTopicDesc(response.data.topic.topicDesc)
            setIsLoading(false);
          })
          .catch(() => console.log("request failed"));
      }, []);

      const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`You edited a topic: ${topicTitle}.`);
        axios.put(`https://tybe.herokuapp.com/userchats/${id}`, { //do I need a new api to adress single chats?
          topicTitle:topicTitle,
          topicDesc:topicDesc  
          })
          .then((response) => {
            console.log(response);

          }, (error) => {
            console.log(error);
          });
        setTopicTitle("");
      }

      const deleteTopic = () => {
        //add delete request
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
      <h1>Welcome to the topicoptions!</h1>
      
      <form onSubmit={handleSubmit}>
        <label>
        <p>Title: {topicTitle}</p>
        New title: 
          <input
            type="text"
            value={topicTitle}
            onChange={e => setTopicTitle(e.target.value)}
          />
        </label> 
        <label>
        <p>Description: {topicDesc}</p>
        New Description: 
          <input
            type="text"
            value={topicDesc}
            onChange={e => setTopicDesc(e.target.value)}
          />
        </label> 
        </form>
        <input type="submit" value="Edit" />
        <button onClick={deleteTopic}> Delete Topic </button>
    </div>
  )
}
}

export default TopicOptions
