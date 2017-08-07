import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import PatientsPage from './components/patientsPage';

export const InitApp = () => {

    const rootElement = document.getElementById('main-content');

    if (rootElement) {
        ReactDOM.render(<Provider store={store}><PatientsPage /></Provider>, rootElement);
    }
};

export default InitApp;

InitApp();
