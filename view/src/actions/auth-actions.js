import axios from 'axios';
import {LANGUAGE_CHANGE} from "./language-actions";

export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const CREATE_PASSWORD = 'CREATE_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOGIN_USER = 'LOGIN_USER';

export const USER_SESSION = 'USER_SESSION';


export const verifyToken = (token, action) => async dispatch => {
    const response = await axios.post('http://localhost:5000/auth/verify/',{token, action});
    dispatch({type: VERIFY_TOKEN, payload: response});
};

export const createPassword = (values, action, token) => async dispatch => {
    const response = await axios.post('http://localhost:5000/auth/create-password', {values, action, token}, {withCredentials: true});
    dispatch({type: CREATE_PASSWORD, payload: response});
};

export const resetPassword = (values) => async dispatch => {
    const response = await axios.post ('http://localhost:5000/auth/reset-password', {values}, {withCredentials: true});
    dispatch({type: RESET_PASSWORD, payload: response});
};

export const login = (user) => async dispatch => {
    const response = await axios.post ('http://localhost:5000/auth/login', {user}, {withCredentials: true});

    if(response.data === "User not found"){
        dispatch({type: LOGIN_USER, payload: response});
    } else {
        let sessionData = await axios.post ('http://localhost:5000/auth/user-session', {user}, {withCredentials: true});
        dispatch({type: LOGIN_USER, payload: response});
        dispatch({type: USER_SESSION, payload: sessionData.data});
        dispatch({type: LANGUAGE_CHANGE, payload: sessionData.data.meta.defaultLanguage});
    }
};

export const logoutUser = () => async dispatch => {
  const response = await axios.post('http://localhost:5000/auth/logout', {}, {withCredentials: true});
  console.log(response);
};

