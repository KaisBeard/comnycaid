import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Chat from "./elements/chat/Chat";
import ChatsList from "./elements/chatsoverview/ChatsList";
import Topic from "./elements/chat/Topic";
import Login from "./elements/Login";
import CreateChat from "./elements/chatsoverview/CreateChat";
import ChatOptions from "./elements/chat/ChatOptions";
import TopicOptions from "./elements/chat/TopicOptions";
import UserProfile from "./elements/chatsoverview/UserProfile";

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path=":userid" element={<ChatsList />} /> 
        <Route path=":userid/newchat" element={<CreateChat />} />
        <Route path=":userid/userprofile" element={<UserProfile />} />
        <Route path=":userid/:chatid" element={<Chat />} />
        <Route path=":userid/:chatid/chatoptions" element={<ChatOptions />} />
        <Route path=":userid/:chatid/topicoptions/:topicid" element={<TopicOptions />} />
      
    </Routes>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
//<Route path="/" element={<App />} >  Was around the other routes before
//</Route>