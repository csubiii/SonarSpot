import React from "react";
import UserTopTracksCard from "./UserTopTracksCard/UserTopTracksCard";

const TopTracks = () => {
  return (
    <div>
     <h1 className="text-3xl font-bold">Your top tracks: </h1>
      <UserTopTracksCard />
    </div>
  )
}

export default TopTracks