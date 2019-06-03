import { DAY_SELECTED } from '../actions';

export default (state= [], action) => {
    switch(action.type){
        case DAY_SELECTED:{
            return action.payload;
        }
        default:
            return state;
    }
};