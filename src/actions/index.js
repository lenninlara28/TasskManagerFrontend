import axios from "../api";

export const loginRequest = (payload) => ({
  type: "LOGIN_REQUEST",
  payload,
});

export const logoutRequest = (payload) => ({
  type: "LOGOUT_REQUEST",
  payload,
});

export const setError = (payload) => ({
  type: "ERROR",
  payload,
});

export const setLoading = (payload) => ({
  type: "LOADING",
  payload,
});

export const login = (payload, redirectUrl) => {
  return (dispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));
    axios({
      url: `/sign-in`,
      method: "post",
      auth: {
        username: payload.correo,
        password: payload.password,
      },
    })
      .then(({ data }) => {
        dispatch(loginRequest(data));
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(setError(error));
      });
  };
};
