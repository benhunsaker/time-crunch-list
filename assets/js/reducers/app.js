import * as ACTIONS from '../actions';

import PatientsStore from '../../../stores/patients';


const initialState = {
    displayPatientForm: false,
    messages: [],
    patientIds: [],
    patients: {},
    sort: { attr: 'LastName', dir: 'ASC' }
};

const compareFunc = (a, b) => {

    if (a > b) return -1;
    else if (a < b) return 1;
    else return 0;
};

const sortThePatients = (patients, sort) => {

    const patientIds = Object.keys(patients);
    return patientIds.sort((a, b) => {

        const result = compareFunc(patients[a][sort.attr], patients[b][sort.attr]);
        return (sort.dir === 'ASC') ? -1 * result : result;
    });
}


export const app = (state = initialState, action) => {

    let newPatientList = null;

    switch (action.type) {
        case ACTIONS.APP_LOAD:
            const patients = {};

            PatientsStore.forEach((patient) => patients[patient.uid] = patient);
            const patientIds = sortThePatients(patients, state.sort);

            return Object.assign({}, state, { patients, patientIds });
        case ACTIONS.SORT_PATIENTS:

            return Object.assign({}, state, {
                patientIds: sortThePatients(state.patients, action.payload),
                sort: action.payload
            });
        case ACTIONS.SAVE_PATIENT:
            const newPatient = Object.assign({}, action.payload, { uid: Date.now() });

            newPatientList = Object.assign({}, state.patients);
            newPatientList[newPatient.uid] = newPatient;

            return Object.assign({}, state, {
                patients: newPatientList,
                patientIds: sortThePatients(newPatientList, state.sort)
            });
        case ACTIONS.REMOVE_PATIENT:
            newPatientList = Object.assign({}, state.patients);

            delete newPatientList[action.payload];

            return Object.assign({}, state, {
                patients: newPatientList,
                patientIds: sortThePatients(newPatientList, state.sort)
            });
        case ACTIONS.ADD_MESSAGE:
            return Object.assign({}, state, { messages: state.messages.concat({ id: Date.now(), text: action.payload }) });
        case ACTIONS.REMOVE_MESSAGE:
            return Object.assign({}, state, { messages: state.messages.filter((message) => message.id !== action.payload) });
        case ACTIONS.OPEN_FORM:
            return Object.assign({}, state, { displayPatientForm: true });
        case ACTIONS.CLOSE_FORM:
            return Object.assign({}, state, { displayPatientForm: false });
        default:
            return state;
    }
};
