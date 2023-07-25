import React, { useContext } from 'react'
import SpotifyContext from '../../../context/SpotifyContext'

const TracksImage = () => {
  const { userTopTracks } = useContext(SpotifyContext)
  console.log(userTopTracks.items.name)
  return (
    <div>
     {userTopTracks.items.map((track, index) => (
        <div key={index}>{track.name}</div>
      ))}
     {userTopTracks.items.map((track, index) => (
        <div key={index}>{track.name}</div>
      ))}
      
    </div>
  )
}

export default TracksImage