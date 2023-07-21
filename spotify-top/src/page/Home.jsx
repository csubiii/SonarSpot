import React, { useEffect, useContext } from 'react'

import SpotifyContext from '../context/SpotifyContext'
import CurrentUser from './CurrentUser'
import TopTracks from './TopTracks'

const Home = ({ logout }) => {

  const token = localStorage.getItem("token")

  return (
    <div>
      <CurrentUser logout={logout} />
      <TopTracks />
    </div>
  )
}

export default Home