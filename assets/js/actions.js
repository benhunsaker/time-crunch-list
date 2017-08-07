/* ACTION Types */
export const APP_LOAD = 'APP_LOAD';
export const SAVE_PATIENT = 'SAVE_PATIENT';
export const SORT_PATIENTS = 'SORT_PATIENTS';

/* ACTION Creators */
export const savePatient = (patient) => ({ type: SAVE_PATIENT, payload: patient });
export const sortPatients = (sortObj) => ({ type: SORT_PATIENTS, payload: sortObj });
