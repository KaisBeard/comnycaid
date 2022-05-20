import './App.css';
import "./inputRange.css";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="appDiv">
      <Outlet />    
    </div>
  )
  
}

export default App;
