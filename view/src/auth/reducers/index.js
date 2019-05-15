import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import verifyTokenReducer from './verify-token-reducer';
import passwordCreateReducer from './password-create-reducer';
import passwordResetReducer from './password-reset-reducer';
import loginUserReducer from './login-reducer';


export default combineReducers({
        messageToken: verifyTokenReducer,
        messageCreatingPassword: passwordCreateReducer,
        messageResettingPassword: passwordResetReducer,
        messageLogin: loginUserReducer,
        form: formReducer
    }
);