import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Layout from '../views/layout';


const internals = {};


const Root = {
    description: 'Root handler',
    handler: (request, reply) => {

        const content = ReactDOMServer.renderToStaticMarkup(<Layout clientScript="app.bundle.js" />);
        return reply(`<!DOCTYPE html>\n${content}`);
    }
};

export default { Root };
