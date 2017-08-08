import React, { Component } from 'react';
import { connect } from 'react-redux';

import { REMOVE_MESSAGE } from '../actions';


const mapStateToProps = (state) => ({ messages: state.messages });
const mapDispatchToProps = (dispatch) => ({
    removeMessage: (payload) => dispatch({ type: REMOVE_MESSAGE, payload })
});


export class MessageBoard extends Component {
    renderMessage(message) {

        return (
            <p key={message.id}>
                {message.text}
                <i onClick={() => this.props.removeMessage(message.id)}>delete</i>
            </p>
        );
    }

    render() {

        return <div className="message-board">{this.props.messages.map(this.renderMessage.bind(this))}</div>;
    }
}

MessageBoard.propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
