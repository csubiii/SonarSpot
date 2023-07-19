const spotifyReducer = (state, action) => {
  switch(action.type) {
    case 'GET_CURRENTUSER':
      return {
        ...state,
        currentUser: action.payload,
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