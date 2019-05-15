import { GET_PROJECT_TO_VIEW } from "../actions";

export default (state = [], action) => {
    switch(action.type){
        case GET_PROJECT_TO_VIEW:{
            return action.payload;
        }
        default:
            return state;
    }
};