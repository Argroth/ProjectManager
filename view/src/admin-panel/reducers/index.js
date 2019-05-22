import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './user-reducer';
import forceChangePasswordReducer from './force-password-change';
import userDisableReducer from './user-disable-reducer';
import createUserReducer from './user-register-reducer';
import selectedUserToEditReducer from './user-get';

export default combineReducers({
        users: userReducer,
        pwChange: forceChangePasswordReducer,
        disableUser: userDisableReducer,
        createUser: createUserReducer,
        selectedUserToEdit: selectedUserToEditReducer,
        form: formReducer
    }
);