import React from 'react'
import {useState} from "react";

function Keyboard() {
    const [chatInput, setChatInput] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Message: ${chatInput}`);
        setChatInput("")
    }
   
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
        />
      </label>
      <input type="submit" value="Send" />
    </form>
    </div>
  )
}

export default Keyboard
