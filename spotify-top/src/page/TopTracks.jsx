import React, { useContext } from "react";
import SpotifyContext from "../context/SpotifyContext";

const TopTracks = () => {
  const { userTopTracks } = useContext(SpotifyContext);

  console.log(userTopTracks)

  return (
    <div>
      helo
      todays comit bc i go shower
    </div>
  )
}

export default TopTracks