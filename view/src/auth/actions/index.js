import axios from 'axios';

export const VERIFY_TOKEN = 'VERIFY_TOKEN';
export const CREATE_PASSWORD = 'CREATE_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOGIN_USER = 'LOGIN_USER';


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
    dispatch({type: LOGIN_USER, payload: response});
};

