require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./decorator');
const mockEndepunkterSomEndrerState = require('./mockEndepunkter').mockEndepunkterSomEndrerState;
const mockForOpplaeringsmiljo = require('./mockEndepunkter').mockForOpplaeringsmiljo;

const server = express();
const env = 'local';
const settings = env === 'local' ? { isProd: false } : require('./settings.json');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = (decoratorFragments) => {
    return new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(
                {
                    SYFOTEKSTER_URL: '/syfotekster/api',
                    LOGINSERVICE_URL: `${process.env.LOGINSERVICE_URL}`,
                    SYFOREST_URL: '/syforest',
                    MOTEREST_URL: '/moterest/api',
                    OPPFOLGINGSDIALOGREST_URL: '/oppfoelgingsdialogrest/api',
                },
                decoratorFragments,
                settings,
            ),
            (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            },
        );
    });
};

const startServer = (html) => {
    server.use(
        '/sykefravaer/resources',
        express.static(path.resolve(__dirname, 'dist/resources')),
    );

    server.use(
        '/sykefravaer/img',
        express.static(path.resolve(__dirname, 'dist/resources/img')),
    );

    server.get(
        ['/', '/sykefravaer/?', /^\/sykefravaer\/(?!.*dist).*$/],
        (req, res) => {
            res.send(html);
        },
    );

    server.get('/health/isAlive', (req, res) => {
        res.sendStatus(200);
    });
    server.get('/health/isReady', (req, res) => {
        res.sendStatus(200);
    });

    server.use(express.json());
    server.use(express.urlencoded());

    mockEndepunkterSomEndrerState(server);
    mockForOpplaeringsmiljo(server);

    const PORT = process.env.PORT || 8080;

    server.listen(PORT, () => {
        console.log('App listening on port: ' + PORT);
    });
};

const logError = (errorMessage, details) => {
    console.log(errorMessage, details);
};

getDecorator()
    .then(renderApp, (error) => {
        logError('Failed to get decorator', error);
        process.exit(1);
    })
    .then(startServer, (error) => {
        logError('Failed to render app', error);
    });
