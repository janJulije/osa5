import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showFull, setShowFull] = useState(false)

  const toggleShowFull = () => {
    setShowFull(!showFull)
  }

  const deleteButton = () => {
    if (user && blog.user.username === user.username) {
      return (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )
    }
  }

  if (showFull) {
    return (
      <div className={'blog'}>
        <div onClick={toggleShowFull}>
          {blog.author}: {blog.title}
        </div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        {deleteButton()}
      </div>
    )
  } else {
    return (
      <div onClick={toggleShowFull} className={'blog'}>
        {blog.author}: {blog.title}
      </div>
    )
  }
}

export default Blog