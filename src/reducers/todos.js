import {
    ALL_TODOS,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL,
    CLEAR_COMPLETED
} from '../constants/ActionTypes'

const initialState = [

];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                action.item,
                ...state
            ];

        case ALL_TODOS:
            return [
                ...action.items
            ];

        case DELETE_TODO:
            return state.filter(todo =>
                todo.id !== action.item.id
            );

        case EDIT_TODO:
            return state.map(todo =>
                todo.id === action.item.id ? {
                        ...todo,
                        ...action.item
                    } :
                    todo
            );

        // case COMPLETE_TODO:
        //     return state.map(todo =>
        //         todo.id === action.id ? { ...todo,
        //                 completed: !todo.completed
        //             } :
        //             todo
        //     )

        case COMPLETE_ALL:
            const areAllMarked = state.every(todo => todo.completed)
            return state.map(todo => ({
                ...todo,
                completed: !areAllMarked
            }))

        case CLEAR_COMPLETED:
            return state.filter(todo => todo.completed === false)

        default:
            return state
    }
}