import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';

const HOST = 'http://localhost:3300';

const NODE_ID = (Math.floor(Math.random() * 0xF0000000) + 0x10000000).toString(16);
const itemId = () => `${NODE_ID}@${Date.now()}`;

const _addTodo = text => {
    return fetch(HOST+'/item/' + itemId() , {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "Description": text
            })
        }).then(res => res.json());
};

export const addTodo = text => dispatch => {
    return _addTodo(text).then(item => {
        return dispatch({
            type: types.ADD_TODO,
            item
        });
    });
};

const _getAllTodos = () => {
    return fetch(HOST + '/item', {
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json());

};

export const getAllTodos = () => dispatch => {
    return _getAllTodos().then(items => {
        return dispatch({
            type: types.ALL_TODOS,
            items: items
        });
    });
};

const _deleteTodo = id => {
    return fetch(HOST+'/item/' + id , {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }).then(res => res.json());
};

export const deleteTodo = id => dispatch => {
    return _deleteTodo(id).then(item => {
        return dispatch({
            type: types.DELETE_TODO,
            item: item
        });
    });
};

const _editTodo = (id, params) => {
    return fetch(HOST+'/item/' + id , {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(res => res.json());
};

export const editTodo = (id, text) => dispatch => {
    return _editTodo(id, {Description: text}).then(item => {
        return dispatch({
            type: types.EDIT_TODO,
            item: item
        });
    });
};

export const completeTodo = id => dispatch => {
    return _editTodo(id, {Done: true}).then(item => {
        return dispatch({
            type: types.EDIT_TODO,
            item: item
        });
    });
};

export const uncompleteTodo = id => dispatch => {
    return _editTodo(id, {Done: false}).then(item => {
        return dispatch({
            type: types.EDIT_TODO,
            item: item
        });
    });
};

export const completeAll = () => (dispatch, getState) => {
    var state = getState();
    return Promise.all(state.todos
        .filter(todo => !todo.Done)
        .map(todo => {
            return completeTodo(todo.id)(dispatch);
        })
    );
};

export const clearCompleted = () => (dispatch, getState) => {
    var state = getState();
    return Promise.all(state.todos
        .filter(todo => todo.Done)
        .map(todo => {
            return uncompleteTodo(todo.id)(dispatch);
        })
    );
};