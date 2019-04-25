import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const EDIT_USER = 'EDIT_USER';
export const FORCE_CHANGE_PASSWORD = 'FORCE_CHANGE_PASSWORD';
export const DISABLE_USER = 'DISABLE_USER';
export const ENABLE_USER = 'ENABLE_USER';
export const CREATE_USER = 'CREATE_USER';

export const createUser = (user) => async dispatch => {
  const response = await axios.post('http://localhost:5000/register', {user});
  console.log(response);
  dispatch({type: CREATE_USER, payload: response});
};

export const fetchUsers = () => async dispatch => {
  const response = await axios.get('http://localhost:5000/getallusers');
  dispatch({type: FETCH_USERS, payload: response});
};

export const editUser = (user) => {
  return{
    type: EDIT_USER,
    payload: user
  }
};

//TODO Add response to the reducer (inform admin that user has been forced to change password)
export const forceChangePassword = (user) => async dispatch => {
  const response = await axios.post('http://localhost:5000/forcepasswordchange', {
      user
  });
  dispatch({type: FORCE_CHANGE_PASSWORD, payload: response});
};

//TODO Add response to the reducer (inform admin that user has been disabled and prevented from login)
export const disableUser = (user) => async dispatch => {
  const response = await axios.post('http://localhost:5000/disableuser', {
    user
  });
  dispatch({type: DISABLE_USER, payload: response});
};

export const enableUser = (user) => async dispatch => {
  const response = await axios.post('http://localhost:5000/enableuser', {
    user
  });
  dispatch({type: ENABLE_USER, payload: response});
};