import { DISABLE_USER } from '../actions';

export default (state= [], action) => {
    switch(action.type){
        case DISABLE_USER:{
            return action.payload;
        }
        default:
            return state;
    }
};