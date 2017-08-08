/* ACTION Types */
export const APP_LOAD = 'APP_LOAD';
export const SAVE_PATIENT = 'SAVE_PATIENT';
export const SORT_PATIENTS = 'SORT_PATIENTS';
export const REMOVE_PATIENT = 'REMOVE_PATIENT';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const OPEN_FORM = 'OPEN_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';

/* ACTION Creators */
export const SaveMessage = (payload) => ({ type: ADD_MESSAGE, payload });
