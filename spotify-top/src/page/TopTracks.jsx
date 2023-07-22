import React, { useContext } from "react";
import SpotifyContext from "../context/SpotifyContext";

const TopTracks = () => {
  const { userTopTracks } = useContext(SpotifyContext);

  console.log(userTopTracks)

  return (
    <div>
      helo
      
    </div>
  )
}

export default TopTracks