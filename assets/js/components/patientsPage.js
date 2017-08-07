import React, { Component } from 'react';
import { connect } from 'react-redux';

import { APP_LOAD } from '../actions';


const mapStateToProps = (state) => ({
    patients: state.patients,
    patientIds: state.patientIds
});
const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch({ type: APP_LOAD })
});


export class PatientsPage extends Component {
    constructor(props) {

        super(props);
        this.renderPatient = this.renderPatient.bind(this);
    }

    componentWillMount() {

        this.props.onLoad();
    }

    renderPatient(patientId) {

        const patient = this.props.patients[patientId];
        return (
            <li key={patient.uid}>
                {patient.LastName}, {patient.FirstName} — {patient.PhoneNumber} — {patient.ZipCode}
            </li>
        );
    }

    render() {

        return (
            <ul className="patient-list">
                {this.props.patientIds.map(this.renderPatient)}
            </ul>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsPage);
