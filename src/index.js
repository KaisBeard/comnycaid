import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Chat from "./elements/Chat";
import ChatsList from "./elements/ChatsList";
import Topic from "./elements/Topic";
import Login from "./elements/Login";

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
      <Route path="/" element={<App />} >
        <Route path="/" element={<Login />} />
        <Route path=":userid" element={<ChatsList />} /> 
        <Route path=":userid/:chatid" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

//<Route path=":topicid" element={<Topic />} >


/*
<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/" element={<Login />} />
        <Route path=":userid" element={<Chats />} /> 
        <Route path=":userid/:chatid" element={<Chat />} >
          <Route path=":userid/:chatid/:topicid" element={<Topic />} >
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
*/






//needs topic path to display messages
//change route on swipe
//change url after an event

//Kw exact //add messages 
// Fill in paths above
// <Route path=":userId" element={<Chats />} >
// how do I stack the paths automatically?

reportWebVitals();
