import React, {
    Component,
    PropTypes
} from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import {
    SHOW_ALL,
    SHOW_COMPLETED,
    SHOW_ACTIVE
} from '../constants/TodoFilters'

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.done,
    [SHOW_COMPLETED]: todo => todo.done
};

export default class MainSection extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    state = {
        filter: SHOW_ALL
    };

    handleClearCompleted = () => {
        this.props.actions.clearCompleted()
    };

    handleCompleteAll = () => {
        this.props.actions.completeAll();
    };

    handleShow = filter => {
        this.setState({
            filter
        })
    };

    componentDidMount(){
        this.props.actions.getAllTodos();
    }

    renderToggleAll(completedCount) {
        const {
            todos,
            actions
        } = this.props
        if (todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll} />
            )
        }
    }

    renderFooter(completedCount) {
        const {
            todos
        } = this.props
        const {
            filter
        } = this.state
        const activeCount = todos.length - completedCount

        if (todos.length) {
            return (
                <Footer completedCount={completedCount}
                        allCount={todos.length}
                        activeCount={activeCount}
                        filter={filter}
                        onClearCompleted={this.handleClearCompleted}
                        onCompleteAll={this.handleCompleteAll}
                        onShow={this.handleShow} />
            )
        }
    }

    render() {
        const {
            todos,
            actions
        } = this.props;
        const {
            filter
        } = this.state;

        const filteredTodos = todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce((count, todo) =>
                todo.done ? count + 1 : count,
            0
        );

        return (
            <section className="main">
                {this.renderToggleAll(completedCount)}
              <ul className="todo-list">
                  {filteredTodos.map(todo =>
                      <TodoItem key={todo.id} todo={todo} {...actions} />
                  )}
              </ul>
                {this.renderFooter(completedCount)}
            </section>
        )
    }
}