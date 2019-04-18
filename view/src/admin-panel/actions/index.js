import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const EDIT_USER = 'EDIT_USER';

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