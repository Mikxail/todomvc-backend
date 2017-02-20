import {
    ALL_TODOS,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL,
    CLEAR_COMPLETED
} from '../constants/ActionTypes'

const initialState = "";

export default function context(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO:
        case ALL_TODOS:
        case DELETE_TODO:
        case EDIT_TODO:
            return action.item.Context;
        default:
            return state;
    }
}