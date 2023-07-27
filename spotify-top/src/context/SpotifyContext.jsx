import axios from "axios";
import { createContext, useReducer } from "react";

import spotifyReducer from "./SpotifyReducer";

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const initialState = {
    currentUser: {},
    userTopTracks: {},
    token: "",
    refreshToken: "",
  };

  const [state, dispatch] = useReducer(spotifyReducer, initialState);

  const getRefresh = () => {
    setLoading();
    const hash = window.location.hash;
    let refreshToken = window.localStorage.getItem("refreshToken");
    if (!refreshToken && hash) {
      refreshToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("refresh_token"))
        .split("=")[1];

      window.location.hash = ""
      window.localStorage.setItem("refreshToken", refreshToken);
    }

    if (refreshToken) {
      dispatch({
        type: "GET_REFRESH_TOKEN",
        payload: refreshToken,
      });
    }
  };

  const getToken = () => {
    setLoading();
    const hash = window.location.hash;
    getRefresh();
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];
      
      window.location.hash = ""
      window.localStorage.setItem("token", token);
    }
    
    if (token) {
      dispatch({
        type: "GET_TOKEN",
        payload: token,
      });
    }
  };

  const getCurrentUser = async (token) => {
    setLoading();
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data) {
      dispatch({
        type: "GET_CURRENTUSER",
        payload: data,
      });
    } else {
      console.log(
        "Token not available. Please check Spotify Developer Settings."
      );
    }
  };

  const getUserTopTracks = async (token) => {
    setLoading();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data) {
      dispatch({
        type: "GET_USERTOPTRACKS",
        payload: data,
      });
    } else {
      console.log(
        "Token not available. Please check Spotify Developer Settings."
      );
    }
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <SpotifyContext.Provider
      value={{
        currentUser: state.currentUser,
        userTopTracks: state.userTopTracks,
        token: state.token,
        refreshToken: state.refreshToken,
        getCurrentUser,
        getUserTopTracks,
        getToken,
        getRefresh,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export default SpotifyContext;