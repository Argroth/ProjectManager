import { GET_USER_BY_ID } from '../../actions/admin-panel-actions';

export default (state = [], action) => {
    switch(action.type){
        case GET_USER_BY_ID:{
            return action.payload;
        }
        default:
            return state;
    }
};