import React, { useEffect, useContext } from 'react'

import SpotifyContext from './context/SpotifyContext'

const Home = () => {

  const { currentUser, getCurrentUser } = useContext(SpotifyContext)

  const token = localStorage.getItem("token")

  useEffect(() => {

  }, [])

  return (
    <div>
      <button onClick={() => getCurrentUser(token)}>Get Current User</button>
      {currentUser.display_name}
    </div>
  )
}

export default Home