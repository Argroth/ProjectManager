import { RESET_PASSWORD } from '../../actions/auth-actions';

export default (state= [], action) => {
    switch(action.type){
        case RESET_PASSWORD:{
            return action.payload;
        }
        default:
            return state;
    }
};