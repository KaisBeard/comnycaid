import React from 'react';
import {useState, useEffect} from "react";
import Topic from "./Topic";
//import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
//import "swiper/css/lazy";
import CreateTopic from "./CreateTopic";
import { Outlet, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import SwipeableRoutes from "react-swipeable-routes";
//import Slider from "react-slick";

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
        //console.log(response.data);
        setTopicsList(response.data.topics);
        setIsLoading(false);
      })
      .catch(() => console.log("request failed"));
  }, []);

  //console.log(topicsList[0]._id);

  const RedView = () => (
    <div style={{ height: 300, backgroundColor: "red" }}>Red</div>
  );
  const BlueView = () => (
    <div style={{ height: 300, backgroundColor: "blue" }}>Blue</div>
  );
  const GreenView = () => (
    <div style={{ height: 300, backgroundColor: "green" }}>Green</div>
  );
  const YellowView = () => (
    <div style={{ height: 300, backgroundColor: "yellow" }}>Yellow</div>
  );
    



  if(isLoading === true) {
    return(<div>loading topics ...</div>)
  } else {

    
          return(
            <div className="swiperContainer">   
              <SwipeableRoutes>
                <Route path="/red" component={RedView} />
                <Route path="/blue" component={BlueView} />
                <Route path="/green" component={GreenView} />
                <Route path="/yellow" component={YellowView} />
              </SwipeableRoutes>
         

          </div>
          
       
      )
    }
}


export default Topics

//swiperslide render function

/*
<Swiper
            spaceBetween={0}
            slidesPerView={1}
            //</div>onSlideChange={(swiper) => console.log(swiper) }
            //onSwiper={(swiper) => console.log(swiper)}  
            initialSlide={1}
            className="swiper"
            hashNavigation={true}
            

            >

            <SwiperSlide className="swiper" data-hash="1"> < CreateTopic /> </SwiperSlide>
              {topicsList.map(a => 
                <SwiperSlide className="swiperSlide swiper swiper-lazy" data-hash={a._id}>
                  <Topic topicData={a}
                    className="swiper-lazy"
                  /> 
                </SwiperSlide>
              )}
          </Swiper> */