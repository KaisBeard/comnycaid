import React from 'react'

function Message({messageData}) {
  
    
  const {
    messageAuthor,
    messageEmoLvl,
    messageReactions,
    messageText,
    messageTime
  } = messageData

  
    return (
    <div>
      <h3>{messageAuthor}</h3> 
            <p>{messageTime}</p>
            <p>{messageText}</p>
    </div>
  )
}

export default Message
