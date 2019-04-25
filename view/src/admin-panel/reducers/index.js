import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './user-reducer';
import editUserReducer from './user-edit-reducer';
import forceChangePasswordReducer from './force-password-change';
import userDisableReducer from './user-disable-reducer';
import createUserReducer from './user-register-reducer';

export default combineReducers({
        selectedUser: editUserReducer,
        users: userReducer,
        pwChange: forceChangePasswordReducer,
        disableUser: userDisableReducer,
        createUser: createUserReducer,
        form: formReducer
    }
);