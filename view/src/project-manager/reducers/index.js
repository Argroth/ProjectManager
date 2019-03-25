import { combineReducers } from 'redux';
import TasksReducer from './tasks-reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    tasks: TasksReducer,
    form: formReducer
});

export default rootReducer;
