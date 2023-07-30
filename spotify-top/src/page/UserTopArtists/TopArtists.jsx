import React from "react";
import UserTopArtistsCard from "./UserTopArtistCard";

const TopArtists = () => {
  return (
    <div className="m-5">
     <h1 className="text-3xl font-bold text-white mb-5">Your top artists: </h1>
      <UserTopArtistsCard />
    </div>
  )
}

export default TopArtists