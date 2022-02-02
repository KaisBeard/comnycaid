import React from 'react';
import {useState, useEffect} from "react";
import Topic from "./Topic";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CreateTopic from "./CreateTopic";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";

function Topics() {
  const params = useParams();
  const id = params.chatid
  const [topicsList, setTopicsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/chattopics/${id}`) 
      .then((response) => {
        console.log(response.data);
        setTopicsList(response.data.topics);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  if(isLoading === true) {
    return(<div>loading topics ...</div>)
  } else {
      return (
        <div>
          <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
          <SwiperSlide> < CreateTopic /> </SwiperSlide>
          {topicsList.map(a => <SwiperSlide><Topic topicData={a} /> </SwiperSlide>)}
        </Swiper>
          
        </div>
      )
    }
}

export default Topics





//Testpath: 61f29a7d600666078e4c6174