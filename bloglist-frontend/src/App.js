import React, { useState, useEffect } from 'react'
import { useField }from './hooks/index'
import './styles.css'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Blogs from './components/Blogs'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'

function App() {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [messageContent, setMessageContent] = useState('')
  const [messageType, setMessageType] = useState('')
  const [messageTimer, setMessageTimer] = useState(null)

  useEffect(() => {
    async function getBlogs() {
      const blogResponse = await blogService.getAll()
      blogResponse.sort((a, b) => b.likes - a.likes)
      setBlogs(blogResponse)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem('user'))
    if (userFromStorage) {
      setUser(userFromStorage)
      blogService.setToken(userFromStorage.token)
    }
  }, [])

  const showMessage = (message, type) => {
    clearTimeout(messageTimer)
    setMessageType(type)
    setMessageContent(message)
    setMessageTimer(setTimeout(() => {
      setMessageType('')
      setMessageContent('')
    }, 3000))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginResponse = await loginService.login(username.value, password.value)

      setUser(loginResponse)
      blogService.setToken(loginResponse.token)
      username.reset()
      password.reset()
      localStorage.setItem('user', JSON.stringify(loginResponse))
      showMessage(`Logged in succesfully as ${loginResponse.username}`, 'success')
    } catch (exception) {
      showMessage('Invalid username or password', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    showMessage('Logged out succesfully', 'success')
    localStorage.removeItem('user')
    setUser(null)
  }

  const handleLike = async (blog) => {
    const returnedBlog = await blogService.likeBlog(blog)
    let blogsAfter = [...blogs].map(b => b.id === returnedBlog.id ? returnedBlog : b)
    blogsAfter.sort((a, b) => b.likes - a.likes)
    setBlogs(blogsAfter)
    showMessage(`Liked blog ${blog.title} by ${blog.author} `, 'success')
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} from the list`)) {
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      showMessage(`Removed blog ${blog.title} by ${blog.author} `, 'success')
    }
  }

  const loginScreen = () => (
    <div>
      <h1><strong>log in to application</strong></h1>

      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
      />
    </div>
  )

  const blogScreen = () => (
    <div>
      <h1>Bloglog</h1>

      <User user={user} handleLogout={handleLogout} />
      <Togglable buttonLabel='add blog'>
        <CreateBlog
          setBlogs={setBlogs}
          blogs={blogs}
          showMessage={showMessage}
        />
      </Togglable>

      <p> </p>

      <Blogs
        blogs={blogs}
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user} />
    </div>
  )

  return (
    <div>
      <Message content={messageContent} style={messageType} />

      {user === null ?
        loginScreen() :
        blogScreen()
      }

    </div>
  )
}

export default App