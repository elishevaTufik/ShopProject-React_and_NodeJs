import { combineReducers } from "redux";
import sweetsStore from "./sweetsReducer";


const reducers= combineReducers({
    sweet:sweetsStore,
})

export default reducers