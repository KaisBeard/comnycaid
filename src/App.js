import './App.css';
//import Chats from "./elements/Chats.js";
//import Login from "./elements/Login.js";
import { Outlet, NavLink } from "react-router-dom";

function App() {
  return (
    <div>
         <Outlet />    
    </div>
  );
}

export default App;
