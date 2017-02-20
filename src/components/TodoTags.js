import React, {
    Component,
    PropTypes
} from 'react'

import TodoTextInput from './TodoTextInput'

export default class TodoTags extends Component {
    static propTypes = {
        tags: PropTypes.array.isRequired,
        onSave: PropTypes.func.isRequired
    };

    state = {
        editing: false
    };

    handleDoubleClick = () => {
        this.setState({
            editing: true
        });
    };

    handleSave = text => {
        text = (text + "").split(/\s+/);
        this.props.onSave(text);
        this.setState({
            editing: false
        });
    };

    render(){
        let {
            tags
        } = this.props;
        return (
            <div style={{height: 20, marginLeft: 60, fontSize: 12}}
                 onClick={this.handleDoubleClick}
            >
                {this.state.editing ?
                    <TodoTextInput
                        text={tags.join(' ')}
                        onSave={text => this.handleSave(text)}
                    />
                :
                    <div>
                        {tags.map((t, idx) =>
                            <span key={idx} style={{marginRight: 10, padding: 1, border: '1px solid rgba(175, 47, 47, 0.3)'}}>{t}</span>
                        )}
                    </div>
                }
            </div>
        );
    }
}