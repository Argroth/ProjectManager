import { CREATE_NEW_TASK } from '../actions';

export default (state= [], action) => {
    switch(action.type){
        case CREATE_NEW_TASK:{
            return action.payload;
        }
        default:
            return state;
    }
};