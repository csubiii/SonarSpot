import React from "react";

import CurrentUser from "./CurrentUser";
import TopArtists from "./UserTopArtists/TopArtists";
import TopTracks from "./UserTopTracks/TopTracks";

const Home = ({ logout }) => {
  return (
    <div>
      <CurrentUser logout={logout} />
      <TopArtists />
      <TopTracks />
    </div>
  );
};

export default Home;
