import { GET_ALL_PROJECTS } from "../actions";

export default (state= [], action) => {
    switch(action.type){
        case GET_ALL_PROJECTS:{
            return action.payload;
        }
        default:
            return state;
    }
};