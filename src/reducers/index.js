const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        user: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
