import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userReducer from './admin-panel-reducers/user-reducer';
import forceChangePasswordReducer from './admin-panel-reducers/force-password-change-reducer';
import userDisableReducer from './admin-panel-reducers/user-disable-reducer';
import createUserReducer from './admin-panel-reducers/user-register-reducer';
import selectedUserToEditReducer from './admin-panel-reducers/user-get-reducer';
import selectedDayReducer from './admin-panel-reducers/calendar-select-date-reducer';
import updateDateReducer from './admin-panel-reducers/calendar-update-date-reducer';
import verifyTokenReducer from "./auth-reducers/verify-token-reducer";
import passwordCreateReducer from "./auth-reducers/password-create-reducer";
import passwordResetReducer from "./auth-reducers/password-reset-reducer";
import loginUserReducer from "./auth-reducers/login-reducer";
import createProjectReducer from "./project-manager-reducers/project-create-reducer";
import getAllProjectsReducer from "./project-manager-reducers/project-list-reducer";
import createTaskReducer from "./project-manager-reducers/project-create-task-reducer";
import getAllUsersReducer from "./project-manager-reducers/project-create-user-list";
import getProjectDataReducer from './project-manager-reducers/project-data-reducer';
import sidebarReducer from './layout-reducers/sidebar-reducer';
import sessionReducer from './auth-reducers/session-reducer';
import languageReducer from './layout-reducers/language-reducer';
import riskListReducer from './project-manager-reducers/project-risk-list-reducer';
import riskCreateReducer from './project-manager-reducers/project-risk-create-reducer';
import calendarReducer from "./project-manager-reducers/project-calendar-reducer";
import selectRiskToEditReducer from './project-manager-reducers/project-risk-to-edit';
import riskDataReducer from './project-manager-reducers/project-risk-data';
import taskListReducer from './project-manager-reducers/gantt-task-list-reducer';

export default combineReducers({
        users: userReducer,
        pwChange: forceChangePasswordReducer,
        disableUser: userDisableReducer,
        createUser: createUserReducer,
        selectedUserToEdit: selectedUserToEditReducer,
        calendar: calendarReducer,
        selectedDay: selectedDayReducer,
        updateDate: updateDateReducer,
        messageToken: verifyTokenReducer,
        messageCreatingPassword: passwordCreateReducer,
        messageResettingPassword: passwordResetReducer,
        messageLogin: loginUserReducer,
        projectCreate: createProjectReducer,
        projectsList: getAllProjectsReducer,
        createTask: createTaskReducer,
        userList: getAllUsersReducer,
        projectData: getProjectDataReducer,
        session: sessionReducer,
        sidebar: sidebarReducer,
        language: languageReducer,
        riskList: riskListReducer,
        riskCreate: riskCreateReducer,
        selectedRisk: selectRiskToEditReducer,
        riskData: riskDataReducer,
        taskList: taskListReducer,
        form: formReducer
    }
);