import React, { useContext, useEffect, useState } from "react";
import SpotifyContext from "./context/SpotifyContext";

import Landing from "./page/Landing";
import Home from "./page/Home";

const App = () => {
  const { getCurrentUser, getUserTopTracks } = useContext(SpotifyContext)
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    const fetchData = async () => {
      try {
        await getCurrentUser(token);
        await getUserTopTracks(token);
      } catch (error) {
        // Handle any errors that might occur during the API calls
        console.error("Error fetching data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      {!token ? (<Landing />) : (<Home logout={logout} />)}
    </div>
  );
};

export default App;
