import './App.css';
import "./inputRange.css";
//import Chats from "./elements/Chats.js";
//import Login from "./elements/Login.js";
import { Outlet, NavLink } from "react-router-dom";
//import { server } from "socket.io";

function App() {
  return (
    <div className="appDiv">
      <Outlet />    
    </div>
  );
}

export default App;
