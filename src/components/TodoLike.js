import React, {
    Component,
    PropTypes
} from 'react'


export default class TodoLike extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        onSave: PropTypes.func.isRequired
    };

    handleClick = () => {
        this.props.onSave(this.props.count+1);
    };

    render(){
        let {
            count
        } = this.props;
        return (
            <button onClick={this.handleClick} style={{
                float: 'right',
                display: 'block',
                position: 'absolute',
                right: 50,
                top: 15,
                bottom: 0,
                cursor: 'pointer'
            }}>+{count}</button>
        );
    }
}