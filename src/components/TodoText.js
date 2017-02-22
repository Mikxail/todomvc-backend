import React, {
    Component,
    PropTypes
} from 'react'
// import classnames from 'classnames'
// import TodoTextInput from './TodoTextInput'
// import TodoTags from './TodoTags';
// import TodoLike from './TodoLike';

export default class TodoItem extends Component {
    static propTypes = {
        texts: PropTypes.array.isRequired,
        onSelect: PropTypes.func.isRequired,
    };

    render(){
        return (
            <div>
                {this.props.texts.length > 1 ?
                    <span style={{color: '#c00'}}>conflict: </span>
                    :
                    null
                }
                {this.props.texts.map((t, idx) => {
                    return (
                        <span key={idx}
                              style={{marginRight: 10, cursor: this.props.texts.length > 1 ? 'pointer': null}}
                              onClick={() => this.props.onSelect(t, idx)}
                        >
                            {t}
                        </span>
                    );
                })}
            </div>
        );
    }
};