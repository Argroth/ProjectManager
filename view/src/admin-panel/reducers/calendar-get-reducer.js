import { FETCH_CALENDAR } from '../actions';

export default (state= [], action) => {
    switch(action.type){
        case FETCH_CALENDAR:{
            return action.payload;
        }
        default:
            return state;
    }
};