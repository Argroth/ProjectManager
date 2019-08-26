import { FORCE_CHANGE_PASSWORD } from '../../actions/admin-panel-actions';

export default (state={}, action) => {
    switch(action.type){
        case FORCE_CHANGE_PASSWORD:
            return action.payload;
        default: return state;
    }
}