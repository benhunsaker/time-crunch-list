import React, { Component } from 'react';
import { connect } from 'react-redux';

import { APP_LOAD, SORT_PATIENTS, OPEN_FORM, REMOVE_PATIENT } from '../actions';
import DeletePatient from './deletePatient';
import NewPatientForm from './NewPatientForm';
import MessageBoard from './messageBoard';


const mapStateToProps = (state) => ({
    displayPatientForm: state.displayPatientForm,
    patients: state.patients,
    patientIds: state.patientIds,
    sort: state.sort
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch({ type: APP_LOAD }),

    showPatientForm: () => dispatch({ type: OPEN_FORM }),

    removePatient: (payload) => dispatch({ type: REMOVE_PATIENT, payload }),
    sortPatients: (payload) => dispatch({ type: SORT_PATIENTS, payload })
});


export class PatientsPage extends Component {
    constructor(props) {

        super(props);

        this.state = { proposedDeletion: null };

        this.sortIt = this.sortIt.bind(this);
        this.openForm = this.openForm.bind(this);
        this.renderPatient = this.renderPatient.bind(this);
    }

    componentWillMount() {

        this.props.onLoad();
    }

    openForm(e) {

        e.preventDefault();
        this.props.showPatientForm();
    }

    sortIt(key) {

        return (e) => {

            e.preventDefault();
            this.props.sortPatients(Object.assign({}, this.props.sort, { [key]: e.target.value }));
        };
    }

    proposedPatientDeletion(uid) {

        return (e) => {

            e.preventDefault();
            this.setState({ proposedDeletion: uid });
        };
    }

    renderPatient(patientId) {

        const patient = this.props.patients[patientId];
        return (
            <li key={patient.uid}>
                {patient.LastName}, {patient.FirstName} — {patient.PhoneNumber} — {patient.ZipCode}
                <a href="#" onClick={this.proposedPatientDeletion(patient.uid)}>delete</a>
            </li>
        );
    }

    render() {

        return (
            <div>
                <MessageBoard />
                <form>
                    <a onClick={this.openForm}>Add a  New Patient</a>
                    <p>
                        <label htmlFor="sort-by">Sort by:</label>
                        <select id="sort-by" value={this.props.sort.attr} onChange={this.sortIt('attr')}>
                            <option value="FirstName">First Name</option>
                            <option value="LastName">Last Name</option>
                            <option value="PhoneNumber">Phone Number</option>
                            <option value="ZipCode">Zip Code</option>
                        </select>
                        <select id="sort-by" value={this.props.sort.dir} onChange={this.sortIt('dir')}>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </p>
                </form>
                <ul className="patient-list">
                    {this.props.patientIds.map(this.renderPatient)}
                </ul>
                <NewPatientForm />
                <DeletePatient
                    proposedDeletion={this.state.proposedDeletion}
                    resetProposedDeletion={() => this.setState({ proposedDeletion: null })}
                />
            </div>
        );
    }
}

PatientsPage.propTypes = {
    onLoad: PropTypes.func,
    showPatientForm: PropTypes.func,
    sortPatients: PropTypes.func,
    sort: PropTypes.object,
    patients: PropTypes.object,
    patientIds: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);
