import { GET_PROJECT_DATA } from "../../actions/project-manager-actions";

export default (state = [], action) => {
    switch(action.type){
        case GET_PROJECT_DATA:{
            return action.payload;
        }
        default:
            return state;
    }
};