import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

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

    validateName(key) {

        const value = this.state.newPatient[key];

        if (value.length < 2 || value.length > 10) return 'Needs to be greater than 2 but less than 10 characters.';
        if (/[0-9]/.test(value)) return 'Cannot include numbers.';
        return null;
    }

    validateTimeSlot(TimeInterval, StartTime, EndTime) {

        if ([15, 30, 60].indexOf(TimeInterval) < 0) return 'Time interval needs to either 15, 30, or 60 minutes.';

        const lastDigits = /:([0-9]{2})/.exec(StartTime);
        if (lastDigits < TimeInterval) return 'The time interval should add up to the hour mark';

        if (parseInt(StartTime) > parseInt(EndTime)) return 'The endtime needs to come after the start time.';

        const TimeSlots = [StartTime];
        let currentTime;
        let infiniteLoopCatch = 0;
        while (TimeSlots[TimeSlots.length - 1] !== EndTime && infiniteLoopCatch < 1000) {
            infiniteLoopCatch++;
            currentTime = TimeSlots[TimeSlots.length - 1].replace(':', '');
            let newTime = parseInt(currentTime) + TimeInterval;
            if (/60$/.test(newTime)) newTime += 40;
            TimeSlots.push(newTime.toString().replace(/([0-9]{2}$)/, ':$1'));
        }
        return TimeSlots;
    }

    validateModel(cb) {

        const validationErrors = {};
        let TimeSlots = null;

        validationErrors.FirstName = this.validateName('FirstName');
        validationErrors.LastName = this.validateName('LastName');

        if (this.state.newPatient.PhoneNumber.length < 10) {
            validationErrors.PhoneNumber = 'Needs to be at least 10 digits';
        }
        else {
            if (!/\(?[0-9]{3}[\)-][0-9]{3}-[0-9]{4}/.test(this.state.newPatient.PhoneNumber)) {
                validationErrors.PhoneNumber = 'Needs to follow the format (###)###-#### or ###-###-####';
            }
        }

        if (!/^[0-9]{5}$/.test(this.state.newPatient.ZipCode)) {
            validationErrors.ZipCode = 'Needs to be 5 digits';
        }

        TimeSlots =  this.validateTimeSlot(30, '8:15', '11:15');
        if (typeof validationErrors.TimeSlots === 'string') {
            validationErrors.TimeSlots = TimeSlots;
        }

        Object.keys(validationErrors).forEach((errKey) => {

            if (validationErrors[errKey] === null) delete validationErrors[errKey];
        });

        this.setState({
            newPatient: Object.assign({}, this.state.newPatient, { TimeSlots }),
            validationErrors
        }, cb);
    }

    addNewPatient(e) {

        e.preventDefault();
        this.validateModel(() => {

            if (Object.keys(this.state.validationErrors).length === 0) {
                const newPatient = this.state.newPatient;
                this.props.addPatient(newPatient);
                this.props.saveMessage(`Successfully added ${newPatient.FirstName} ${newPatient.LastName}`);
                this.setState({ newPatient: initialNewPatient });
                this.props.hidePatientForm();
            }
            else this.props.saveMessage('There were validation error that need correcting.');
        });
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

    renderInput(key, label) {

        return (
            <div className={'col-12 col-md-6 form-group' + (this.state.validationErrors[key] ? ' has-danger' : null)}>
                <label htmlFor={`${key}-input`}>{label}</label>
                <input id={`${key}-input`} className="form-control form-control-success form-control-danger" name={key} value={this.state.newPatient[key]} onChange={this.trackInput} />
                {this.state.validationErrors[key] ? <p className="form-control-feedback">{this.state.validationErrors[key]}</p> : null}
            </div>
        );
    }

    render() {

        return (
            <Modal
                isOpen={this.props.displayPatientForm}
                onRequestClose={this.closeForm}
                contentLabel="new-patient-form"
                style={{
                    content: {
                        bottom: 'auto',
                        top: '10%',
                        height: '80%'
                    }
                }}
            >

                <h3>Want to Add a New Patient</h3>
                <MessageBoard />
                <form className="form" onSubmit={this.addNewPatient}>

                    <div className="row mb-3">
                        {this.renderInput('FirstName', 'First Name')}
                        {this.renderInput('LastName', 'Last Name')}
                    </div>
                    <div className="row mb-3">
                        {this.renderInput('PhoneNumber', 'Phone Number')}
                        {this.renderInput('ZipCode', 'Zip Code')}
                    </div>
                    <div className="text-right mt-3">
                        <button className="btn btn-primary mr-3" type="submit">Submit</button>
                        <button className="btn btn-link close-form-link" onClick={this.closeForm}>Cancel</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

NewPatientForm.propTypes = {
    addPatient: PropTypes.func,
    saveMessage: PropTypes.func,
    hidePatientForm: PropTypes.func,
    displayPatientForm: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPatientForm);
