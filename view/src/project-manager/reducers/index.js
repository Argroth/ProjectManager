import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import createProjectReducer from './project-create-reducer';
import getAllProjectsReducer from './project-list-reducer';

export default combineReducers({
    projectCreate: createProjectReducer,
    projectsList: getAllProjectsReducer,
    form: formReducer
    }
);