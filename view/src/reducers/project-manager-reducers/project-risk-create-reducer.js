import { CREATE_NEW_RISK } from "../../actions/project-manager-actions";

export default (state = [], action) => {
    switch(action.type){
        case CREATE_NEW_RISK:{
            return action.payload;
        }
        default:
            return state;
    }
};