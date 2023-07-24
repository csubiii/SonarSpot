import React from "react";

import CurrentUser from "./CurrentUser";
import TopTracks from "./TopTracks";

const Home = ({ logout }) => {
  return (
    <div>
      <CurrentUser logout={logout} />
      <TopTracks />
    </div>
  );
};

export default Home;
