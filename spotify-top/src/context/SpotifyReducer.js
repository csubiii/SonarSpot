const spotifyReducer = (state, action) => {
  switch(action.type) {
    case 'GET_TOKEN':
      return {
        ...state,
        token: action.payload,
        loading: false,
      }
    case 'GET_REFRESH_TOKEN':
      return {
        ...state,
        refreshToken: action.payload,
        loading: false,
      }
    case 'GET_CURRENTUSER':
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
      }
    case 'GET_USERTOPARTISTS':
      return {
        ...state,
        userTopArtists: action.payload,
        loading: false,
      }
    case 'GET_USERTOPTRACKS':
      return {
        ...state,
        userTopTracks: action.payload,
        loading: false,
      }
    case 'GET_PLAYBACKSTATE':
      return {
        ...state,
        playbackState: action.payload,
        loading: false,
      }
      case 'SET_LOADING':
        return {
          ...state,
          loading: true,
        }
    default:
      return state
  }
};

export default spotifyReducer;