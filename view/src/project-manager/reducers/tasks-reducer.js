import {FETCH_TASK, FETCH_TASKS} from "../actions";
import _ from 'lodash';

export default function (state = {}, action) {


    switch (action.type) {

        case FETCH_TASK:
            return {...state, [action.payload.data.id]: action.payload.data};

        case FETCH_TASKS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;

    }
}