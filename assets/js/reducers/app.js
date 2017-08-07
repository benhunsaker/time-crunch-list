import * as ACTIONS from '../actions';

import PatientsStore from '../../../stores/patients';


const initialState = {
    sort: { LastName: 'DESC' },
    patientIds: [],
    patients: {}
};


export const app = (state = initialState, action) => {

    let updatedGoals = null;

    switch (action.type) {
        case ACTIONS.APP_LOAD:
            const patients = {};

            PatientsStore.forEach((patient) => patients[patient.uid] = patient);
            return Object.assign({}, state, { patients, patientIds: Object.keys(patients) });
        case ACTIONS.SAVE_GOAL:
            updatedPatients = Object.assign({}, state.goals);
            updatedPatients[action.payload.uid] = action.payload;

            return Object.assign({}, state, { patients: updatedPatients, patientIds: Object.keys(updatedPatients) });
        default:
            return state;
    }
};
