import React from 'react'
import { useField }from '../hooks/index'
import blogsService from '../services/blogs'

const CreateBlog = ({ setBlogs, blogs, showMessage }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      if (title.value !== '' && author.value !== '' && url.value !== '') {
        const blog = {
          title: title.value,
          author: author.value,
          url: url.value
        }

        const returnedBlog = await blogsService.createBlog(blog)
        title.reset()
        author.reset()
        url.reset()
        showMessage(`Added ${returnedBlog.title} by ${returnedBlog.author}`, 'success')
        setBlogs(blogs.concat(returnedBlog))
      }
    } catch (exception) {
      showMessage(`${exception}`, 'error')
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Add blog</h2>
      <p>
        title:
        <input
          {...title} reset={null}
          placeholder='Blog about stuff'>
        </input>
      </p>
      <p>
        author:
        <input
          {...author} reset={null}
          placeholder='Blog Creator'>
        </input>
      </p>
      <p>
        url:
        <input
          {...url} reset={null}
          placeholder='https://www.adress.com'>
        </input>
      </p>

      <button type='submit' onClick={handleCreateBlog}>add</button>
    </div>
  )
}

export default CreateBlog