// import {createStore} from 'redux';
// const Initial_State = [1,0,1];
// const increment = (input) => {
//     return {
//         type:"Add",
//         data:input
//     }
// }
// const reducer = (state=Initial_State,action) => {
//     switch(action.type){
//         case "Add":
//             return state[1]+1;
//         case "Sub":
//             return state[2]-1;
//     }
// }

// const store = createStore(reducer);
// store.subscribe(()=>{console.log('listening')});
// export default store;




import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web;
import requestReducer from './reducer.js';

const rootReducer = combineReducers(
    {requests:requestReducer}
);

const persistConfig = {
    key:"root",
    storage,
    whitelist:["requests"]
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = createStore(persistedReducer,applyMiddleware(thunk));

export const persistedStore = persistStore(store)
