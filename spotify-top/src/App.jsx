import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import querystring from 'querystring';

import './app.css'

import SpotifyContext from "./context/SpotifyContext";

import Landing from "./page/Landing";
import Home from "./page/Home";

const App = () => {
  const { getCurrentUser, getUserTopArtists, getToken, token, refreshToken } = useContext(SpotifyContext);
 
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
    window.location.reload();
  };
console.log(window.localStorage.getItem("refreshToken"))
console.log("this is the", refreshToken)
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

  useEffect(() => {
    // Function to fetch data when user is logged in
    const fetchDataWhenLoggedIn = async () => {
      if (!token) getToken();
      else {
        try {
          await getCurrentUser(token);
          await getUserTopArtists(token);
        } catch (error) {
          // Handle any errors that might occur during the API calls
          console.error('Error fetching data:', error);
          refreshAccessToken();
        }
      }
    };

    fetchDataWhenLoggedIn(); // Call fetchDataWhenLoggedIn on component mount when the token is available

    const intervalId = setInterval(() => {
      console.log("interval run")
      fetchDataWhenLoggedIn(); // Call the function on each interval
    }, 3600000);

    // Clean up the interval when the component unmounts or the token changes
    return () => clearInterval(intervalId);
  }, [token]);

  return (
    <div>
      {!token ? (<Landing />) : (<Home logout={logout} />)}
    </div>
  );
};

export default App;
