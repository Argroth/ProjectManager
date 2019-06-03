import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './user-reducer';
import forceChangePasswordReducer from './force-password-change-reducer';
import userDisableReducer from './user-disable-reducer';
import createUserReducer from './user-register-reducer';
import selectedUserToEditReducer from './user-get-reducer';
import fetchCalendarReducer from './calendar-get-reducer';
import selectedDayReducer from './calendar-select-date-reducer';
import updateDateReducer from './calendar-update-date-reducer';

export default combineReducers({
        users: userReducer,
        pwChange: forceChangePasswordReducer,
        disableUser: userDisableReducer,
        createUser: createUserReducer,
        selectedUserToEdit: selectedUserToEditReducer,
        calendar: fetchCalendarReducer,
        selectedDay: selectedDayReducer,
        updateDate: updateDateReducer,
        form: formReducer
    }
);