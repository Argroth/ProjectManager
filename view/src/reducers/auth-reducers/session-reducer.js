import {USER_SESSION} from '../../actions/auth-actions';

export default (state= [], action) => {
    switch(action.type){
        case USER_SESSION:{
            return action.payload;
        }
        default:
            return state;
    }
};