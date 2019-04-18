import { EDIT_USER } from '../actions';

export default (state= [], action) => {
    console.log(action);
    switch(action.type){
        case EDIT_USER:{
            return action.payload;
        }
        default:
            return state;
    }
};