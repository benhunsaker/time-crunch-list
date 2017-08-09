import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Head from './partials/head';
import Config from '../../configs/general';


export default class Layout extends Component {
    render() {

        const devServer = (process.env.NODE_ENV === 'development') ? `//${Config.hostname}:${Config.hmr_port}/js/` : `//${Config.hostname}:${Config.port}/js/`;
        return (
            <html lang="en-us" className="no-js">
                <Head title="Hapi Genisus" />
                <body>
                    <nav className="navbar navbar-light bg-faded">
                        <h1 className="navbar-brand mb-0">Patient Directory</h1>
                    </nav>
                    <div className="container">
                        <div id="main-content" />
                    </div>

                    <script src={devServer + this.props.clientScript} />
                </body>
            </html>
        );
    }
};

Layout.propTypes = {
    clientScript: PropTypes.string
};
