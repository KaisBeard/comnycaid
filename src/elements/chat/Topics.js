import React, { Suspense } from 'react';
import {useState, useEffect} from "react";

import { Virtual } from 'swiper';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/virtual';

//import "swiper/css/lazy";
import CreateTopic from "./CreateTopic";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";
//import SwipeableRoutes from "react-swipeable-routes";
import Topic from "./Topic";




//check what to leave out at the swiper!

function Topics() {
  const params = useParams();
  const id = params.chatid;
  const userId = params.userid;
  const [topicsList, setTopicsList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [swiperIndex, setSwiperIndex] = useState();
  //console.log(id);
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

  //console.log(topicsList[0]._id);


  
  if(isLoading === true) {
    return(<div>loading topics ...</div>)
  } else {
          return(
            <div className="swiperContainer">  
          <Swiper
            modules={[Virtual]}
            spaceBetween={0}
            slidesPerView={1}
            //</div>onSlideChange={(swiper) => console.log(swiper) }
            //onSwiper={(swiper) => console.log(swiper)}  
            initialSlide={1}
            //addSlidesAfter={0}
            //addSlidesBefore={0}
            virtual
            >
            <SwiperSlide className="swiper" data-hash="1"> 
              < CreateTopic /> 
            </SwiperSlide>
            {topicsList.map(a => 
              <SwiperSlide key={a._id} >
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
//Try virtual slides


//key={} virtualIndex={}