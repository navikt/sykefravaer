
// eslint-disable-next-line camelcase
const prom_client = require('prom-client');
// eslint-disable-next-line camelcase
const { Histogram, Counter } = prom_client;

const APP_METRIC_PREFIX = 'sykefravaer_';
const METRIC_FILTER_INFIX = 'bruker_klikk_';

const getMetricName = (infix, name) => {
    return `${APP_METRIC_PREFIX}${infix}${name}`;
};

const httpRequestDurationMicroseconds = new Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
});

const userKlikkMotebehovCounter = new Counter({
    name: getMetricName(METRIC_FILTER_INFIX, 'motebehov'),
    help: 'Number of times users has answered the need for a meeting',
});

module.exports = {
    getMetricName,
    APP_METRIC_PREFIX,
    METRIC_FILTER_INFIX,
    httpRequestDurationMicroseconds,
    userKlikkMotebehovCounter,
};
