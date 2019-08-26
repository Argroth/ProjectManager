import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './admin-panel-reducers/user-reducer';
import forceChangePasswordReducer from './admin-panel-reducers/force-password-change-reducer';
import userDisableReducer from './admin-panel-reducers/user-disable-reducer';
import createUserReducer from './admin-panel-reducers/user-register-reducer';
import selectedUserToEditReducer from './admin-panel-reducers/user-get-reducer';
import fetchCalendarReducer from './admin-panel-reducers/calendar-get-reducer';
import selectedDayReducer from './admin-panel-reducers/calendar-select-date-reducer';
import updateDateReducer from './admin-panel-reducers/calendar-update-date-reducer';
import verifyTokenReducer from "./auth-reducers/verify-token-reducer";
import passwordCreateReducer from "./auth-reducers/password-create-reducer";
import passwordResetReducer from "./auth-reducers/password-reset-reducer";
import loginUserReducer from "./auth-reducers/login-reducer";
import createProjectReducer from "./project-manager-reducers/project-create-reducer";
import getAllProjectsReducer from "./project-manager-reducers/project-list-reducer";
import getProjectToView from "./project-manager-reducers/project-view-reducer";
import createTaskReducer from "./project-manager-reducers/project-create-task-reducer";
import getAllUsersReducer from "./project-manager-reducers/project-create-user-list";
import sidebar from './layout-reducers/sidebar-reducer';
import session from './auth-reducers/session-reducer';

export default combineReducers({
        users: userReducer,
        pwChange: forceChangePasswordReducer,
        disableUser: userDisableReducer,
        createUser: createUserReducer,
        selectedUserToEdit: selectedUserToEditReducer,
        calendar: fetchCalendarReducer,
        selectedDay: selectedDayReducer,
        updateDate: updateDateReducer,
        messageToken: verifyTokenReducer,
        messageCreatingPassword: passwordCreateReducer,
        messageResettingPassword: passwordResetReducer,
        messageLogin: loginUserReducer,
        projectCreate: createProjectReducer,
        projectsList: getAllProjectsReducer,
        projectViewData: getProjectToView,
        createTask: createTaskReducer,
        userList: getAllUsersReducer,
        session: session,
        sidebar,
        form: formReducer
    }
);