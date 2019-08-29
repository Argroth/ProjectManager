import {LANGUAGE_CHANGE} from '../../actions/language-actions'


export default (state= [], action) => {
    switch(action.type){
        case LANGUAGE_CHANGE:{
            return action.payload;
        }
        default:
            return state;
    }
};
