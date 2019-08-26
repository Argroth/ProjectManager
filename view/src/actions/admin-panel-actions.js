import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const FORCE_CHANGE_PASSWORD = 'FORCE_CHANGE_PASSWORD';
export const DISABLE_USER = 'DISABLE_USER';
export const ENABLE_USER = 'ENABLE_USER';
export const CREATE_USER = 'CREATE_USER';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const FETCH_CALENDAR = 'FETCH_CALENDAR';
export const DAY_SELECTED = "DAY_SELECTED";
export const UPDATE_DATE = "UPDATE_DATE";

export const createUser = (user) => async dispatch => {
    const response = await axios.post('http://localhost:5000/auth/register', {user});
    dispatch({type: CREATE_USER, payload: response});
};

export const fetchUsers = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/admin-panel/user-list');
    dispatch({type: FETCH_USERS, payload: response});
};

export const forceChangePassword = (user) => async dispatch => {
    const response = await axios.post('http://localhost:5000/admin-panel/force-password-change', {user});
    dispatch({type: FORCE_CHANGE_PASSWORD, payload: response});
};

export const enableUser = (user) => async dispatch => {
    const response = await axios.post('http://localhost:5000/admin-panel/user-enable', {user});
    dispatch({type: ENABLE_USER, payload: response});
};

export const disableUser = (user) => async dispatch => {
    const response = await axios.post('http://localhost:5000/admin-panel/user-disable', {user});
    dispatch({type: DISABLE_USER, payload: response});
};

export const getUser = (userID) => async dispatch => {
    const response = await axios.post('http://localhost:5000/admin-panel/get-user', {userID}, {withCredentials: true});
    dispatch({type: GET_USER_BY_ID, payload: response});
};

export const fetchCalendar = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/calendar/get-dates');
    dispatch({type: FETCH_CALENDAR, payload: response});
};

export const selectDate = (date) =>{
    return {
        type: DAY_SELECTED,
        payload: date
    }
};

export const updateDate = (date) => async dispatch => {
    const response = await axios.post('http://localhost:5000/calendar/date-update', {date});
    dispatch({type: UPDATE_DATE, payload: response});
};