import { GET_RISK_LIST } from "../../actions/project-manager-actions";

export default (state = [], action) => {
    switch(action.type){
        case GET_RISK_LIST:{
            const occurred = [];
            const notOccurred = [];

            action.payload.map(risk => {
               if(risk.occurred === false){
                   notOccurred.push(risk)
               }else{
                   occurred.push(risk)
               }
            });
            return {occurred: occurred, notOccurred: notOccurred}
        }
        default:
            return state;
    }
};