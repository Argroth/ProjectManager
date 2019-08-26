import {CREATE_PASSWORD} from '../../actions/auth-actions';

export default (state= [], action) => {
    switch(action.type){
        case CREATE_PASSWORD:{
            return action.payload;
        }
        default:
            return state;
    }
};