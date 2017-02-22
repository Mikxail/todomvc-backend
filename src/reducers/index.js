import { combineReducers } from 'redux'
import todos from './todos'
import context from './context';
import remoteTodos from './remoteTodos';

const rootReducer = combineReducers({
    todos,
    remoteTodos,
    context
});

export default rootReducer
