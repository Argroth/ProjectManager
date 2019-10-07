import { GET_TASK_LIST } from '../../actions/project-manager-actions';

export default (state = [], action) => {
    switch(action.type){
        case GET_TASK_LIST:{
            return action.payload;
        }
        default:
            return state;
    }
};