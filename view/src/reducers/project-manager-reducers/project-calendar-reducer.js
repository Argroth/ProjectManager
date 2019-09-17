import { GET_CALENDAR } from '../../actions/project-manager-actions';

export default (state= [], action) => {
    switch(action.type){
        case GET_CALENDAR:{
            return action.payload;
        }
        default:
            return state;
    }
};