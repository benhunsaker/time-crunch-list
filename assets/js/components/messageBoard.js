import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { REMOVE_MESSAGE } from '../actions';


const mapStateToProps = (state) => ({ messages: state.messages });
const mapDispatchToProps = (dispatch) => ({
    removeMessage: (payload) => dispatch({ type: REMOVE_MESSAGE, payload })
});


export class MessageBoard extends Component {
    renderMessage(message) {

        return (
            <p className="alert alert-info alert-dismissible" role="alert" key={message.id}>
                {message.text}

                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.removeMessage(message.id)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </p>
        );
    }

    render() {

        if (this.props.messages.length === 0) return null;

        return <div className="message-board mt-3 mb-3">{this.props.messages.map(this.renderMessage.bind(this))}</div>;
    }
}

MessageBoard.propTypes = {
    messages: PropTypes.array,
    removeMessage: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
