require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const promClient = require('prom-client');
const getDecorator = require('./decorator');
const counters = require('./server/counters');

// Prometheus metrics
const setupMetrics = () => {
    const { collectDefaultMetrics, Registry } = promClient;
    collectDefaultMetrics({ timeout: 5000 });

    const register = new Registry();

    register.registerMetric(counters.httpRequestDurationMicroseconds);
    register.registerMetric(counters.userKlikkJaMotebehovCounter);
    register.registerMetric(counters.userKlikkNeiMotebehovCounter);
    register.registerMetric(counters.userKlikkAktivitetsplan);

    collectDefaultMetrics({ register });
    return register;
};
const prometheus = setupMetrics();

const server = express();

const env = process.argv[2];
const settings = env === 'local' ? { isProd: false } : require('./settings.json');

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = (decoratorFragments) => {
    return new Promise((resolve, reject) => {
        server.render(
            'index.html',
            Object.assign(
                {},
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

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

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
        ['/', '/sykefravaer/?', /^\/sykefravaer\/(?!(resources|img)).*$/],
        nocache,
        (req, res) => {
            res.send(html);
            counters.httpRequestDurationMicroseconds
                .labels(req.route.path)
                .observe(10);
        },
    );

    server.get('/prometheus', (req, res) => {
        res.set('Content-Type', prometheus.contentType);
        res.end(prometheus.metrics());
    });

    server.post('/sykefravaer/metrics/actions/links/:type', (req, res) => {
        const counterPostfix = req.params.type
            ? req.params.type
            : '';
        const counterKey = counters.getMetricName(counters.METRIC_FILTER_INFIX, counterPostfix);
        prometheus.getSingleMetric(counterKey).inc(1, new Date());
        res.sendStatus(200);
    });

    server.post('/sykefravaer/metrics/actions/aktivitetsplan/:antallSykedager', (req, res) => {
        const antallSykedager = req.params.antallSykedager
            ? req.params.antallSykedager
            : -1;
        const counterKey = counters.getMetricName(counters.METRIC_FILTER_INFIX, 'aktivitetsplan');
        prometheus.getSingleMetric(counterKey).labels(antallSykedager).inc(1, new Date());
        res.sendStatus(200);
    });

    server.get('/is_alive', (req, res) => {
        res.sendStatus(200);
    });
    server.get('/is_ready', (req, res) => {
        res.sendStatus(200);
    });

    if (env === 'opplaering' || env === 'local') {
        require('./mock/mockEndepunkter')(server, env === 'local');
    }

    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`App listening on port: ${port}`);
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
