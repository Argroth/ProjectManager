import { CREATE_USER } from '../../actions/admin-panel-actions';

export default (state= [], action) => {
    switch(action.type){
        case CREATE_USER:{
            return action.payload;
        }
        default:
            return state;
    }
};