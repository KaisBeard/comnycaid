import React from 'react';
import {useState, useEffect} from "react";
import Topic from "./Topic";
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import CreateTopic from "./CreateTopic";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";


//check what to leave out at the swiper!

function Topics() {
  const params = useParams();
  const id = params.chatid;
  const userId = params.userid;
  const [topicsList, setTopicsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);
  //const swiperSlider = useSwiperSlide();


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
        <div className="swiperContainer">
          
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            //</div>onSlideChange={(swiper) => console.log(swiper) }
            onSwiper={(swiper) => console.log(swiper)}  
            initialSlide={1}
            className="swiper"
            >
          <SwiperSlide className="swiper"> < CreateTopic /> </SwiperSlide>
          {topicsList.map(a => 
            <SwiperSlide className="swiperSlide" className="swiper">
              <Topic topicData={a}
              /> 
            </SwiperSlide>
          )}
        </Swiper>
          
        </div>
      )
    }
}

export default Topics

//swiperslide render function


