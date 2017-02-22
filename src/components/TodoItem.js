import React, {
    Component,
    PropTypes
} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import TodoTags from './TodoTags';
import TodoLike from './TodoLike';
import TodoText from './TodoText';

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
        let text = todo.text.text;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={text[0]}
                               editing={this.state.editing}
                               onSave={(text) => this.handleSave(todo.id, text)} />
            )
        } else {
            element = (
                <div className="view">
                    <input className="toggle"
                         type="checkbox"
                         checked={todo.done}
                         onChange={() => completeTodo(todo.id)} />
                    <label onDoubleClick={this.handleDoubleClick}>
                        <TodoText texts={text}
                                  onSelect={text => this.handleSave(todo.id, text)}
                        />
                    </label>
                    <button className="destroy"
                          onClick={() => deleteTodo(todo.id)} />
                    {/*<TodoLike count={todo.likes || 0}*/}
                              {/*onSave={count => this.props.updateTodo(todo.id, {likes: count})}*/}
                    {/*/>*/}
                    <TodoTags tags={todo.tags || []}
                              onSave={tags => this.props.updateTodo(todo.id, {tags: tags})}
                    />
                </div>
            )
        }

        return (
            <li className={classnames({
                completed: todo.done,
                editing: this.state.editing
            })}>
                {element}
            </li>
        )
    }
}