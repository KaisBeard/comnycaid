import React from 'react'

function CreateChat() {
    const [newTopic, setNewTopic] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`You created a new topic: ${newTopic}`);
        setChatInput("") }

  return (
    <div>
        <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={chatInput}
          onChange={e => setNewTopic(e.target.value)}
        />
      </label>
      <input type="submit" value="Send" />
    </form>
    </div>
  )
}

export default CreateChat
