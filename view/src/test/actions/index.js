import axios from 'axios';

export const fetchUsers = () => async dispatch => {
    const response = await axios.get('http://localhost:5000/getallusers');
    dispatch({type: 'FETCH_USERS', payload: response});
};

export const editUser = (user) => {
  return{
      type: 'EDIT_USER',
      payload: user
  }
};