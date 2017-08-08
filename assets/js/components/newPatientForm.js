import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { CLOSE_FORM, SAVE_PATIENT, SaveMessage } from '../actions';
import MessageBoard from './messageBoard';


const initialNewPatient = {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    ZipCode: ''
};

const mapStateToProps = (state) => ({ displayPatientForm: state.displayPatientForm });
const mapDispatchToProps = (dispatch) => ({
    addPatient: (payload) => dispatch({ type: SAVE_PATIENT, payload }),
    hidePatientForm: () => dispatch({ type: CLOSE_FORM }),
    saveMessage: (payload) => dispatch(SaveMessage(payload))
});


export class NewPatientForm extends Component {
    constructor(props) {

        super(props);

        this.state = {
            newPatient: initialNewPatient,
            validationErrors: {}
        };

        this.trackInput = this.trackInput.bind(this);
        this.addNewPatient = this.addNewPatient.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    validateModel() {

        const validationErrors = {};
        if (this.state.newPatient.FirstName.length < 2 || this.state.newPatient.FirstName.length > 10) {
            validationErrors.FirstName = 'Needs to be greater than 2 but less than 10 characters';
        }
        else {
            if (/[0-9]/.test(this.state.newPatient.FirstName)) {
                validationErrors.FirstName = 'Cannot include numbers';
            }
        }
        if (this.state.newPatient.LastName.length < 2 || this.state.newPatient.LastName.length > 10) {
            validationErrors.LastName = 'Needs to be greater than 2 but less than 10 characters';
        }
        else {
            if (/[0-9]/.test(this.state.newPatient.LastName)) {
                validationErrors.LastName = 'Cannot include numbers';
            }
        }
        if (this.state.newPatient.PhoneNumber.length < 10) {
            validationErrors.PhoneNumber = 'Needs to be at least 10 digits';
        }
        else {
            if (!/\(?[0-9]{3}[\)-][0-9]{3}-[0-9]{4}/.test(this.state.newPatient.PhoneNumber)) {
                validationErrors.PhoneNumber = 'Needs to follow the format (###)###-#### or ###-###-####';
            }
        }
        if (this.state.newPatient.ZipCode.length !== 5) {
            validationErrors.ZipCode = 'Needs to be 5 digits';
        }
        this.setState({ validationErrors });
        return Object.keys(validationErrors).length;
    }

    addNewPatient(e) {

        e.preventDefault();
        if (this.validateModel() === 0){
            const newPatient = this.state.newPatient;
            this.props.addPatient(newPatient);
            this.props.saveMessage(`Successfully added ${newPatient.FirstName} ${newPatient.LastName}`);
            this.setState({ newPatient: initialNewPatient });
            this.props.hidePatientForm();
        }
    }

    closeForm() {

        this.setState({
            newPatient: initialNewPatient,
            validationErrors: {}
        });
        this.props.hidePatientForm();
    }

    trackInput(e) {

        e.preventDefault();
        const inputTarget = e.target;
        this.setState({
            newPatient: Object.assign({}, this.state.newPatient, { [inputTarget.name]: inputTarget.value })
        });
    }

    getErrorClass(key) {
        return this.state.validationErrors[key] ? 'validation-error' : null;
    }

    renderErrorMessage(key) {
        return this.state.validationErrors[key] ? <span className="validation-error-message">{this.state.validationErrors[key]}</span> : null;
    }

    render() {

        return (
            <Modal
                isOpen={this.props.displayPatientForm}
                onRequestClose={this.closeForm}
                contentLabel="new-patient-form"
            >
                <form onSubmit={this.addNewPatient}>
                    <MessageBoard />
                    <p className={this.getErrorClass('FirstName')}>
                        <label htmlFor="first-name-input">First Name:</label>
                        <input id="first-name-input" name="FirstName" value={this.state.newPatient.FirstName} onChange={this.trackInput} />
                        {this.renderErrorMessage('FirstName')}
                    </p>
                    <p className={this.getErrorClass('LastName')}>
                        <label htmlFor="last-name-input">Last Name:</label>
                        <input id="last-name-input" name="LastName" value={this.state.newPatient.LastName} onChange={this.trackInput} />
                        {this.renderErrorMessage('LastName')}
                    </p>
                    <p className={this.getErrorClass('PhoneNumber')}>
                        <label htmlFor="phone-number-input">Phone Number:</label>
                        <input id="phone-number-input" name="PhoneNumber" value={this.state.newPatient.PhoneNumber} onChange={this.trackInput} />
                        {this.renderErrorMessage('PhoneNumber')}
                    </p>
                    <p className={this.getErrorClass('ZipCode')}>
                        <label htmlFor="zip-code-input">Zip Code:</label>
                        <input id="zip-code-input" name="ZipCode" value={this.state.newPatient.ZipCode} onChange={this.trackInput} />
                        {this.renderErrorMessage('ZipCode')}
                    </p>
                    <button type="submit">Submit</button>
                    <i className="close-form-link" onClick={this.closeForm}>X</i>
                </form>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPatientForm);
