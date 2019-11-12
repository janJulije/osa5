import React from 'react'

const Message = ({ content, style }) => {
  if (content === '') {
    return(
      null
    )
  } else {
    return (
      <div className={style}>
        <p id='messageText'>
          {content}
        </p>
      </div>
    )
  }
}

export default Message