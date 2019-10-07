import { FETCH_USERS } from "../../actions/admin-panel-actions";

export default (state={}, action) => {
    switch (action.type) {
        case FETCH_USERS:{
            return action.payload;
        }
        default:
            return state;
    }

};

