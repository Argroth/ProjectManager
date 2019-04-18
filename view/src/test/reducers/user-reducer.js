const FETCH_USERS = 'FETCH_USERS';

export default (state= [], action) => {
console.log(action);
    switch(action.type){
        case FETCH_USERS:{
            return action.payload;
        }
        default:
            return state;
    }
};