import {VERIFY_TOKEN} from '../../actions/auth-actions';

export default (state= [], action) => {
    switch(action.type){
        case VERIFY_TOKEN:{
            return action.payload;
        }
        default:
            return state;
    }
};