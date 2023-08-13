import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import querystring from 'querystring';

import SpotifyContext from "./context/SpotifyContext";

import Landing from "./page/Landing";

const Home = lazy(() => import("./page/Home"));

const App = () => {
  const { getCurrentUser, getUserTopArtists, getUserTopTracks, getPlaybackState, getToken, token } = useContext(SpotifyContext);

  const refreshToken = localStorage.getItem("refreshToken");

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  const fetchDataWhenLoggedIn = async () => {
    try {
      if (!token) {
        getToken();
      } else {
        await getCurrentUser(token);
        await getUserTopArtists(token);
        await getUserTopTracks(token);
        await getPlaybackState(token);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      logout();
    }
  };

  useEffect(() => {
    fetchDataWhenLoggedIn();

    const intervalId = setInterval(fetchDataWhenLoggedIn, 3600000);

    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <div>
      {!token ? (<Landing />) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Home logout={logout} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
