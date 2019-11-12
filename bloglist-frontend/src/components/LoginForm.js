import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin }) => (
  <div>
    <p>
      username
      <input {...username} reset={null}>
      </input>
    </p>
    <p>
      password
      <input {...password} reset={null}>
      </input>
    </p>
    <button type='submit' onClick={handleLogin}>login</button>
  </div>
)

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm