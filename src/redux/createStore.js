import {createStore, combineReducers } from 'redux'
import Reducers from './Reducer'
 
const rootReducer = combineReducers({
    data: Reducers
})
export default createStore(rootReducer)