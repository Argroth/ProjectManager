import { GET_USER_BY_ID } from '../actions';

export default (state = [], action) => {
    switch(action.type){
        case GET_USER_BY_ID:{
            return action.payload;
        }
        default:
            return state;
    }
};