import { UPDATE_DATE } from '../../actions/admin-panel-actions';

export default (state= [], action) => {
    switch(action.type){
        case UPDATE_DATE:{
            return action.payload;
        }
        default:
            return state;
    }
};