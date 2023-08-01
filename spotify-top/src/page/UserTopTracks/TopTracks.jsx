import React from "react";
import UserTopTracksCard from "./UserTopTracksCard";

const TopTracks = () => {
  return (
    <div className="m-5">
     <h1 className="text-3xl font-bold text-white mb-5">Your top artists: </h1>
      <UserTopTracksCard />
    </div>
  )
}

export default TopTracks