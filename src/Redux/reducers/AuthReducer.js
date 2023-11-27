const AuthReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_STARTED":
      return {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case "AUTH_SUCCESS":
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };
      break;
    case "AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
      break;
    default:
      return state;
      break;
  }
};

export default AuthReducer;
