import React from "react";

import CurrentUser from "../navbar/CurrentUser";
import TopArtists from "./UserTopArtists/TopArtists";
import TopTracks from "./UserTopTracks/TopTracks";

const Home = ({logout}) => {
  return (
    <div>
      <CurrentUser logout={logout}/>
      <div className="m-2 sm:m-5">
        <TopArtists/>
        <TopTracks/>
      </div>
    </div>
  );
};

export default Home;
