
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

const userKlikkJaMotebehovCounter = new Counter({
    name: getMetricName(METRIC_FILTER_INFIX, 'motebehov_ja'),
    help: 'Number of times users has answered yes to the need for a meeting',
});

const userKlikkNeiMotebehovCounter = new Counter({
    name: getMetricName(METRIC_FILTER_INFIX, 'motebehov_nei'),
    help: 'Number of times users has answered no to the need for a meeting',
});

const userKlikkAktivitetsplan = new Counter({
    name: getMetricName(METRIC_FILTER_INFIX, 'aktivitetsplan'),
    help: 'Number of times users has clicked link to aktivitetsplan',
});

module.exports = {
    getMetricName,
    APP_METRIC_PREFIX,
    METRIC_FILTER_INFIX,
    httpRequestDurationMicroseconds,
    userKlikkJaMotebehovCounter,
    userKlikkNeiMotebehovCounter,
    userKlikkAktivitetsplan,
};
