import React from 'react';
import {useState, useEffect} from "react";
import Topic from "./Topic";
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
//import { useSwiperSlide, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css/bundle';
import CreateTopic from "./CreateTopic";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";

function Topics() {
  const params = useParams();
  const id = params.chatid
  const [topicsList, setTopicsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);
  //const swiperSlider = useSwiperSlide();
  const [activeTopicId, setActiveTopicId] = useState();


  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/chattopics/${id}`) 
      .then((response) => {
        console.log(response.data);
        setTopicsList(response.data.topics);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);



  const checkActiveSlideId = () => {
    //SwiperSlide isActive ? console.log(active)
  }

  if(isLoading === true) {
    return(<div>loading topics ...</div>)
  } else {
      return (
        <div>
          <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={(swiper) => console.log(swiper)
                //console.log('slide change');
                //setActiveTopicId   
              }
              onSlideChange={(swiper) => setActiveTopicId(swiper.activeIndex)} //doesnt't console log anymore
              onSlideChange={console.log(activeTopicId)}
              onSwiper={(swiper) => console.log(swiper)}  
              initialSlide={1}
            >
          <SwiperSlide> < CreateTopic /> </SwiperSlide>
          {topicsList.map(a => 
            <SwiperSlide>
              <Topic topicData={a} /> 
            </SwiperSlide>
          )}
        </Swiper>
          
        </div>
      )
    }
}

export default Topics

//swiperslide render function


