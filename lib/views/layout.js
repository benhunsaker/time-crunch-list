import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Head from './partials/head';
import Config from '../../configs/general';


export default class Layout extends Component {
    render() {

        const devServer = (process.env.NODE_ENV === 'development') ? `//${Config.hostname}:${Config.hmr_port}/js/` : '/';
        return (
            <html lang="en-us" className="no-js">
                <Head title="Hapi Genisus" />
                <body>
                    <div id="main-content" />

                    <script src={devServer + this.props.clientScript} />
                </body>
            </html>
        );
    }
};

Layout.propTypes = {
    clientScript: PropTypes.string
};
