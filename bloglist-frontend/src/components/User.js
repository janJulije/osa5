import React from 'react'

const User = ({ user, handleLogout }) => (
  <div>
    <p>
      {user.name} logged in
      <button type='submit' onClick={handleLogout}>logout</button>
    </p>
  </div>
)

export default User