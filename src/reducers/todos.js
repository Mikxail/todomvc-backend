import {
    ALL_TODOS,
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL,
    CLEAR_COMPLETED
} from '../constants/ActionTypes'

const initialState = [];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ALL_TODOS:
            return action.res.items || [];
        case ADD_TODO:
            return [{
                id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                done: false,
                text: {text: [action.text]}
            },
                ...state
            ];

        case DELETE_TODO:
            return state.filter(todo =>
                todo.id !== action.id
            );

        case EDIT_TODO:
            return state.map(todo => {
                return todo.id === action.id ? {
                        ...todo,
                        ...action.item,
                        text: {
                            ...todo.text,
                            text: action.item.text ? [action.item.text] : todo.text.text
                        }
                    } :
                    todo
            });

        case COMPLETE_TODO:
            return state.map(todo =>
                todo.id === action.id ? { ...todo,
                        done: !todo.done
                    } :
                    todo
            );

        case COMPLETE_ALL:
            const areAllMarked = state.every(todo => todo.done);
            return state.map(todo => ({
                ...todo,
                done: !areAllMarked
            }));

        case CLEAR_COMPLETED:
            return state.filter(todo => todo.done === false);

        default:
            return state
    }
}
