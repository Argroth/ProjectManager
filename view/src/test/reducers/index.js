import { combineReducers} from "redux";
import userReducer from './user-reducer';
import editUser from './edit-user-reducer';


export default combineReducers({
    users: userReducer,
    userSelected: editUser
});