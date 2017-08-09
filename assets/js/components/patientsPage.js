import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
            <div className="col-md-6 col-lg-4" key={patient.uid}>
                <div className="card patient--card mb-4">
                    <div className="card-block">
                        <h5 className="patient--name">
                            <img src="/img/glyphicons-4-user.png" className="info-icon mr-2" />
                            {patient.LastName}, {patient.FirstName}
                        </h5>
                        <div className="row">
                            <p className="patient--phone-number col mb-0">
                                <img src="/img/glyphicons-443-earphone.png" className="info-icon mr-2"/>
                                {patient.PhoneNumber}
                            </p>
                            <p className="patient--zip-code col-3 col-xl-4 mb-0">
                                <img src="/img/glyphicons-341-globe.png" className="info-icon mr-2" />
                                {patient.ZipCode}
                            </p>
                        </div>

                        <button type="button" className="patient--delete-link close text-danger" data-dismiss="alert" aria-label="Close" onClick={this.proposedPatientDeletion(patient.uid)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        return (
            <div>
                <MessageBoard />
                <form className="row p-3">
                    <div className="col-md-3 pl-0">
                        <a className="btn btn-primary" href="#" onClick={this.openForm}>Add a  New Patient</a>
                    </div>
                    <div className="col mt-3 mt-md-0 text-md-right p-0">
                        <label htmlFor="sort-by" className="mr-3">Sort by:</label>
                        <select id="sort-by" className="custom-select mr-3" value={this.props.sort.attr} onChange={this.sortIt('attr')}>
                            <option value="FirstName">First Name</option>
                            <option value="LastName">Last Name</option>
                            <option value="PhoneNumber">Phone Number</option>
                            <option value="ZipCode">Zip Code</option>
                        </select>
                        <select id="sort-by" className="custom-select" value={this.props.sort.dir} onChange={this.sortIt('dir')}>
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                        </select>
                    </div>
                </form>
                <div className="row patient-list">
                    {this.props.patientIds.map(this.renderPatient)}
                </div>
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
