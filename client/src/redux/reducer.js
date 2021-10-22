import {ADD_DATA} from './constants.js'
const initialState = {
    allRequests:[]
}
const requestReducer = (state=initialState,action) => {
    switch(action.type){
        case ADD_DATA:
            //condition to show only last 10 requests
            if(state.allRequests.length==10){
                let newarr = state.allRequests;
                newarr.pop(0);
                return {
                    ...state,
                    allRequests:[...newarr,action.payload]
                }
            }
            else{
                return {
                    ...state,
                    allRequests:[...state.allRequests,action.payload]
                }
            }
        default:
            return state;
    }   
}
export default requestReducer;