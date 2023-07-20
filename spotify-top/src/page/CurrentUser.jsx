import React ,{ useEffect, useContext } from 'react'

import SpotifyContext from '../context/SpotifyContext'

const CurrentUser = () => {
  const { currentUser, getCurrentUser } = useContext(SpotifyContext)

  const token = localStorage.getItem("token")

  useEffect(() => {
  getCurrentUser(token)
  console.log(currentUser.images[0].url)
  }, [])

  const { display_name, external_urls, followers, images } = currentUser;

  return (
    <div>
      <div className="">
        <div className="">
          <img src={currentUser.images[0].url} alt="profile picture" />
          {display_name}
        </div>
      </div>
    </div>
  )
}

export default CurrentUser