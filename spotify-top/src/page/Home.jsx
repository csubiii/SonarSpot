import React from "react";

import CurrentUser from "./CurrentUser";
import TopArtists from "./UserTopTracks/TopArtists";

const Home = ({ logout }) => {
  return (
    <div>
      <CurrentUser logout={logout} />
      <TopArtists />
    </div>
  );
};

export default Home;
