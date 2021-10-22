import { ADD_DATA } from "./constants"

export const addData = (data) => {
    console.log(data);
    return (dispatch) => {
        dispatch({
            type:ADD_DATA,
            payload:data
        })
    }
}