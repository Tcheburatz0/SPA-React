import {AuthApi} from "../api/api";
import {stopSubmit} from "redux-form"

const SET_AUTH_USER = "OS/auth-reducer/SET_AUTH_USER";
const LOG_OUT = "OS/auth-reducer/LOG_OUT";


const initialState = {
  token: "",
  isAuth: localStorage.getItem('token'),
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        token: action.token,
        isAuth: true,
      };
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: "",
        isAuth: false,
      };
    default:
      return state;
  }
};

const setAuthUserSucces = token => ({type: SET_AUTH_USER, token});
export const logOut = () => ({type: LOG_OUT});

export const setAuthUser = (login, pass) => {
  return async dispatch => {
    const response = await AuthApi.auth(login, pass);
    if (response && response.statusText === "OK") {
      dispatch(setAuthUserSucces(response.data.token));
    } else {
      const action = stopSubmit("auth", {_error: 'invalid username or password'})
      dispatch(action)
    }
  }
}

export default AuthReducer