import React, {
    Component,
    PropTypes
} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import TodoTags from './TodoTags';

export default class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        updateTodo: PropTypes.func.isRequired,
        editTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired
    };

    state = {
        editing: false
    };

    handleDoubleClick = () => {
        this.setState({
            editing: true
        })
    };

    handleSave = (id, text) => {
        if (text.length === 0) {
            this.props.deleteTodo(id)
        } else {
            this.props.editTodo(id, text)
        }
        this.setState({
            editing: false
        })
    };

    handleUpdate = (id, params) => {
        this.props.updateTodo(id, params);
    };

    render() {
        const {
            todo,
            completeTodo,
            uncompleteTodo,
            deleteTodo
        } = this.props;

        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.Description}
                               editing={this.state.editing}
                               onSave={(text) => this.handleSave(todo.id, text)} />
            )
        } else {
            element = (
                <div className="view">
                    <input className="toggle"
                         type="checkbox"
                         checked={todo.Done}
                         onChange={() => todo.Done ? uncompleteTodo(todo.id) : completeTodo(todo.id)} />
                    <label onClick={this.handleDoubleClick}>
                      {todo.Description}
                    </label>
                    <button className="destroy"
                          onClick={() => deleteTodo(todo.id)} />
                    <TodoTags tags={todo.Tags || []}
                              onSave={tags => this.props.updateTodo(todo.id, {Tags: tags})}
                    />
                </div>
            )
        }

        return (
            <li className={classnames({
                completed: todo.Done,
                editing: this.state.editing
            })}>
                {element}
            </li>
        )
    }
}