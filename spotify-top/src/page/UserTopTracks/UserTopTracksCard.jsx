import React, { useContext } from 'react'
import SpotifyContext from '../../context/SpotifyContext'

const UserTopTracksCard = () => {
  const { userTopTracks } = useContext(SpotifyContext)
  console.log(userTopTracks)
  return (
    <div>UserTopTracksCard</div>
  )
}

export default UserTopTracksCard