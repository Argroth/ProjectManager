import { CREATE_PROJECT } from '../../actions/project-manager-actions';

export default (state= [], action) => {
    switch(action.type){
        case CREATE_PROJECT:{
            return action.payload;
        }
        default:
            return state;
    }
};

