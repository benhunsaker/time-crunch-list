import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { REMOVE_PATIENT, SaveMessage } from '../actions';


const mapStateToProps = (state) => ({
    patients: state.patients
});

const mapDispatchToProps = (dispatch) => ({
    removePatient: (payload) => dispatch({ type: REMOVE_PATIENT, payload }),
    saveMessage: (payload) => dispatch(SaveMessage(payload))
});


export class PatientsPage extends Component {
    constructor(props) {

        super(props);

        this.continueWithPatientDeletion = this.continueWithPatientDeletion.bind(this);
    }

    continueWithPatientDeletion(procede) {

        return (e) => {

            e.preventDefault();
            if (procede) {
                const oldPatient = this.props.patients[this.props.proposedDeletion];
                this.props.removePatient(this.props.proposedDeletion);
                this.props.saveMessage(`Successfully removed ${oldPatient.FirstName} ${oldPatient.LastName}`);
            };
            this.props.resetProposedDeletion();
        };
    }

    render() {

        if (!this.props.proposedDeletion) return null;

        const patient = this.props.patients[this.props.proposedDeletion];
        return (
            <Modal
                isOpen={true}
                onRequestClose={this.props.resetProposedDeletion}
                contentLabel="Delete Modal"
            >
                <p>Are you sure you want to delete {patient.FirstName} {patient.LastName}?</p>
                <a href="#" onClick={this.continueWithPatientDeletion(true)}>Yes, you are kind of making a big of this.</a>
                <a href="#" onClick={this.continueWithPatientDeletion(false)}>No, we need to keep them.</a>
            </Modal>
        );
    }
}

PatientsPage.propTypes = {
    patients: PropTypes.object,
    proposedDeletion: PropTypes.any,
    removePatient: PropTypes.func,
    saveMessage: PropTypes.func,
    resetProposedDeletion: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);
