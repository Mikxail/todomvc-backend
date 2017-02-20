import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';

const HOST = 'http://localhost:3300';

const NODE_ID = (Math.floor(Math.random() * 0xF0000000) + 0x10000000).toString(16);
const itemId = () => `${NODE_ID}@${Date.now()}`;

const _addTodo = (ctx, text) => {
    return fetch(HOST+'/item/' + itemId() , {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "Context": ctx,
                "Description": text
            })
        }).then(res => res.json());
};

export const addTodo = text => (dispatch, getState) => {
    var state = getState();
    return _addTodo(text).then(state.context, item => {
        return dispatch({
            type: types.ADD_TODO,
            item
        });
    });
};

const _getAllTodos = (ctx) => {
    return fetch(HOST + '/item', {
        headers: {
            'content-type': 'application/json'
        },
        // body: JSON.stringify({
        //     "Context": ctx
        // })
    }).then(res => res.json());

};

export const getAllTodos = () => (dispatch, getState) => {
    return _getAllTodos(getState().context).then(item => {
        return dispatch({
            type: types.ALL_TODOS,
            item: item
        });
    });
};

const _deleteTodo = (ctx, id) => {
    return fetch(HOST+'/item/' + id , {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "Context": ctx,
        })
    }).then(res => res.json());
};

export const deleteTodo = id => (dispatch, getState) => {
    return _deleteTodo(getState().context, id).then(item => {
        return dispatch({
            type: types.DELETE_TODO,
            item: item
        });
    });
};

const _editTodo = (ctx, id, params) => {
    return fetch(HOST+'/item/' + id , {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(Object.assign({Context: ctx}, params))
    }).then(res => res.json());
};

export const editTodo = (id, text) => (dispatch, getState) => {
    return _editTodo(getState().context, id, {Description: text}).then(item => {
        return dispatch({
            type: types.EDIT_TODO,
            item: item
        });
    });
};

export const updateTodo = (id, params) => (dispatch, getState) => {
    return _editTodo(getState().context, id, params).then(item => {
        return dispatch({
            type: types.EDIT_TODO,
            item: item
        });
    });
};

export const completeTodo = id => (dispatch, getState) => {
    return _editTodo(getState().context, id, {Done: true}).then(item => {
        return dispatch({
            type: types.EDIT_TODO,
            item: item
        });
    });
};

export const uncompleteTodo = id => (dispatch, getState) => {
    return _editTodo(getState().context, id, {Done: false}).then(item => {
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