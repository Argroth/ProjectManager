import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import createProjectReducer from './project-create-reducer';
import getAllProjectsReducer from './project-list-reducer';
import getProjectToView from './project-view-reducer';
import createTaskReducer from './project-create-task-reducer';
import getAllUsersReducer from './project-create-user-list';

export default combineReducers({
    projectCreate: createProjectReducer,
    projectsList: getAllProjectsReducer,
    projectViewData: getProjectToView,
    createTask: createTaskReducer,
    userList: getAllUsersReducer,
    form: formReducer
    }
);