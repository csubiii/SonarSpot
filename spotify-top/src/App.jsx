import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import querystring from 'querystring';

import './app.css'

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

  const refreshAccessToken = async () => {
    try {
      const data = querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: 'a85a45a07852417ab856b4d7f10b0010',
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      });

      const response = await axios.post('https://accounts.spotify.com/api/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const newAccessToken = response.data.access_token;
      localStorage.setItem("token", newAccessToken); // Store the token in local storage
      window.location.reload();
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
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
      refreshAccessToken();
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
