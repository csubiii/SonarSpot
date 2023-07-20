import React, { useEffect, useContext } from 'react'

import SpotifyContext from '../context/SpotifyContext'
import CurrentUser from './CurrentUser'

const Home = ({ logout }) => {

  const token = localStorage.getItem("token")

  return (
    <div>
      <CurrentUser />
      <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Home