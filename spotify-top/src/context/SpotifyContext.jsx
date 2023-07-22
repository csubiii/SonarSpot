import axios from 'axios'
import { createContext, useReducer } from 'react'

import spotifyReducer from './SpotifyReducer'

const SpotifyContext = createContext();

export const SpotifyProvider = ({children}) => {
  const initialState = {
    currentUser: {},
    userTopTracks: {},
  }

  const [state, dispatch] = useReducer(spotifyReducer, initialState);

  const getCurrentUser = async (token) => {
    setLoading();
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if(data) {
      dispatch({
        type: 'GET_CURRENTUSER',
        payload: data,
      });
    } else {
      console.log('Token not available. Please check Spotify Developer Settings.')
    }
  };

  const getUserTopTracks = async (token) => {
    setLoading();
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if(data) {
      dispatch({
        type: 'GET_USERTOPTRACKS',
        payload: data,
      });
    } else {
      console.log('Token not available. Please check Spotify Developer Settings.')
    }
  };

  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <SpotifyContext.Provider value={{
    currentUser: state.currentUser,
    userTopTracks: state.userTopTracks,
    getCurrentUser,
    getUserTopTracks,
  }}>
    {children}
  </SpotifyContext.Provider>
};


export default SpotifyContext;