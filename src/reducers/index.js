import { combineReducers } from 'redux'
import todos from './todos'
import context from './context';

const rootReducer = combineReducers({
    todos,
    context
});

export default rootReducer
