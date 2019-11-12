import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleLike, handleDelete, user }) => {
  blogs = blogs.map(blog => <Blog blog={blog} key={blog.title} handleLike={handleLike} handleDelete={handleDelete} user={user} />)

  return (
    <div>
      {blogs}
    </div>
  )
}

export default Blogs