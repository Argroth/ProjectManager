import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import editUserReducer from './edit-user-reducer';


export default combineReducers({
        selectedUser: editUserReducer,
        users: userReducer
    }
);