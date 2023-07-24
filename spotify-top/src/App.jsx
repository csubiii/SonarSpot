import React, { useContext, useEffect, useState } from "react";
import SpotifyContext from "./context/SpotifyContext";

import Landing from "./page/Landing";
import Home from "./page/Home";

const App = () => {
  const { getCurrentUser, getUserTopTracks, getToken, token } = useContext(SpotifyContext);
 
  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.reload()
  };

useEffect(() => {
// Function to fetch data when user is logged in
  const fetchDataWhenLoggedIn = async () => {
    if(!token) getToken();
    else {
      try {
        await getCurrentUser(token);
        await getUserTopTracks(token);
      } catch (error) {
        // Handle any errors that might occur during the API calls
        console.error("Error fetching data:", error);
      }
    }
  };

  fetchDataWhenLoggedIn(); // Call fetchDataWhenLoggedIn on component mount when the token is available

}, [token]); // Add token as a dependency here to trigger the effect whenever token changes

  return (
    <div>
      {!token ? (<Landing />) : (<Home logout={logout} />)}
    </div>
  );
};

export default App;
