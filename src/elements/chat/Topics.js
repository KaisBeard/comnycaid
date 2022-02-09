import React from 'react';
import {useState, useEffect} from "react";
import Topic from "./Topic";
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import CreateTopic from "./CreateTopic";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { io, Socket } from "socket.io-client";
const socket = io("http://localhost:3001/");


//check what to leave out at the swiper!

function Topics() {
  const params = useParams();
  const id = params.chatid;
  const userId = params.userid;
  const [topicsList, setTopicsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMsg, setNewMsg] = useState({});
  const [ messages, setMessages ] = useState({});
  //console.log(id);
  //const swiperSlider = useSwiperSlide();

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/chattopics/${id}`) 
      .then((response) => {
        const { topics } = response.data;
        const promises = topics.map(({ _id }) =>
          axios.get(`https://tybe.herokuapp.com/topicmessages/${_id}`).then((type) => type.data.messages)
        );
        Promise.all(promises).then((results) => {
          const messageObj = results.reduce((acc, list) => {
            return {
              ...acc,
              [list[0].messageTopic]: list
            }
          }, {})
          socket.on('message', (msg) => {
            const { messageTopic } = msg
            console.log(messageTopic)
            console.log(messageObj)
            console.log(messageObj[messageTopic])
    
            setMessages({
              ...messageObj,
              [messageTopic]: [
                ...messageObj[messageTopic],
                msg
              ]
            })
          });
          setMessages(messageObj)
        });
        setTopicsList(topics);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));

  }, []);

  useEffect(() => {
    if (topicsList.length) {
      /*Promise.all(topicsList.map({_id} => )).then((values) => {
        console.log(values);
      });*/
      topicsList.forEach(({_id}) => {
        socket.emit('joinTopic', { authorId: userId, topicId: _id});
      })



  }
}, [topicsList])

  //console.log(newMsg)

  if(isLoading === true) {
    return(<div>loading topics ...</div>)
  } else {
      return (
        <div className="swiperContainer">
          
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            //</div>onSlideChange={(swiper) => console.log(swiper) }
            //onSwiper={(swiper) => console.log(swiper)}  
            initialSlide={1}
            className="swiper"
            >
          <SwiperSlide className="swiper"> < CreateTopic /> </SwiperSlide>
          {topicsList.map(a => 
            <SwiperSlide className="swiperSlide" className="swiper">
              <Topic topicData={a} messageList={messages[a._id] || []} /> 
            </SwiperSlide>
          )}
        </Swiper>
          
        </div>
      )
    }
}

export default Topics

//swiperslide render function


