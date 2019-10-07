import { MARK_RISK_TO_EDIT } from "../../actions/project-manager-actions";

export default (state = [], action) => {
    switch(action.type){
        case MARK_RISK_TO_EDIT:{
            return {risk: action.payload}
        }
        default:
            return state;
    }
};