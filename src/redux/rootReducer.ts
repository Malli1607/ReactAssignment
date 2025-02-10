import { combineReducers } from 'redux';
import personReducer from './personSlice';
import deptReducer from './deptSlice';


export const rootReducer = combineReducers({
  person: personReducer, 
  department : deptReducer  
});
