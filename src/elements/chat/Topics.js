import React from 'react';
import { useState, useEffect } from "react";
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/virtual';
import CreateTopic from "./CreateTopic";
import { useParams } from "react-router-dom";
import axios from "axios";
import Topic from "./Topic";

function Topics() {
  const params = useParams();
  const chatId = params.chatid;
  //const userId = params.userid;
  const [topicsList, setTopicsList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://tybe.herokuapp.com/chattopics/${chatId}`) 
      .then((response) => {
        //console.log(response.data);
        setTopicsList(response.data.topics);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  return(
    <div className="swiperContainer">  
      <Swiper
        observer={true}
        observeParents={true}
        modules={[Virtual]}
        spaceBetween={0}
        slidesPerView={1}
        initialSlide={1}
        virtual
        >
        <SwiperSlide className="swiper" data-hash="1"> 
          < CreateTopic /> 
        </SwiperSlide>
        {isLoading? <SwiperSlide className="swiper" data-hash="1"> loading ...</SwiperSlide> :
        topicsList.map(a => 
          <SwiperSlide key={a._id} >
            <Topic topicData={a}
            />
          </SwiperSlide>
        )
        }
      </Swiper>
    </div>
  )
  
}

export default Topics
