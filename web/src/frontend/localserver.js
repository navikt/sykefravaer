require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./decorator');
const moment = require('moment')
const server = express();

const env = 'local';
const settings = env === 'local' ? {isProd: false} : require('./settings.json');

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


    // MOCKS
    server.use(express.json());
    server.use(express.urlencoded());

    const ledetekster = require('./test/mock/tekster').ledetekster;
    const sykmeldinger = require('./test/mock/sykmeldinger').sykmeldinger;
    const soknader = require('./test/mock/soknader').soknader;
    const arbeidstakersoknader = require('./test/mock/arbeidstakersoknader').arbeidstakersoknader;

    const nyUtlandsoppholdsoknad = require('./test/mock/soknader').nySoknadUtland;

    const mockData = {
        ledetekster: ledetekster,
        sykmeldinger: sykmeldinger,
        soknader: soknader,
        arbeidstakersoknader: arbeidstakersoknader,
    };

    server.get('/syfotekster/api/tekster', (req, res) => {
        res.send(JSON.stringify(ledetekster));
    });

    server.get('/syfoapi/syfosoknad/api/soknader', (req, res) => {
        res.send(JSON.stringify(mockData.soknader));
    });

    server.post('/syfoapi/syfosoknad/api/opprettSoknadUtland', (req, res) => {
        if (!mockData.soknader.find((soknad) => {
            return soknad.id === nyUtlandsoppholdsoknad.id;
        })) {
            mockData.soknader = [...mockData.soknader, nyUtlandsoppholdsoknad];
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(nyUtlandsoppholdsoknad));
    });

    server.post('/syfoapi/syfosoknad/api/oppdaterSporsmal', (req, res) => {
        const soknad = req.body;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(soknad));
    });

    server.post('/syfoapi/syfosoknad/api/avbrytSoknad', (req, res) => {
        const soknad = req.body;
        if (soknad.soknadstype === 'OPPHOLD_UTLAND') {
            mockData.soknader = mockData.soknader.filter((s) => {
                return s.id !== soknad.id;
            });
        } else {
            mockData.soknader = mockData.soknader.map((s) => {
                return s.id === soknad.id
                    ? {
                        ...s,
                        avbruttDato: new Date(),
                        status: 'AVBRUTT',
                    }
                    : s;
            });
        }

        res.send(JSON.stringify({}));
    });

    server.post('/syfoapi/syfosoknad/api/gjenapneSoknad', (req, res) => {
        const soknad = req.body;
        mockData.soknader = mockData.soknader.map((s) => {
            return s.id === soknad.id
                ? {
                    ...s,
                    avbruttDato: null,
                    status: 'NY',
                }
                : s;
        });

        res.send(JSON.stringify({}));
    });

    server.post('/syfoapi/syfosoknad/api/sendSoknad', (req, res) => {
        const {id, sporsmal} = req.body;

        const soknadTilInnsending = mockData.soknader.filter(soknad => soknad.id === id)[0];

        mockData.soknader = mockData.soknader.map((soknad) => {
            if (soknad.id === id) {
                soknad.status = 'SENDT';
                soknad.sporsmal = sporsmal;
                soknad.innsendtDato = new Date();
            }

            if (soknad.id === soknadTilInnsending.korrigerer) {
                soknad.korrigertAv = soknadTilInnsending.id;
                soknad.status = 'KORRIGERT'
            }

            return soknad;
        });

        res.send(JSON.stringify({}));
    });

    server.post('/syfoapi/syfosoknad/api/soknader/:id/korriger', (req, res) => {
        const { id } = req.params;
        const soknadSomKorrigeres = mockData.soknader.filter(soknad => soknad.id === id)[0];
        var utkast = mockData.soknader.filter(soknad => soknad.korrigerer === id)[0];

        if (!utkast) {
            utkast = Object.assign({}, soknadSomKorrigeres, {
                id: uuid(),
                status: 'UTKAST_TIL_KORRIGERING',
                opprettetDato: moment().format('YYYY-MM-DD'),
                innsendtDato: null,
                korrigerer: soknadSomKorrigeres.id
            });
            mockData.soknader.push(utkast);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(utkast));
    });

    server.post('/syfounleash/', (req, res) => {
        const toggles = req.body.reduce((acc, toggle) => Object.assign({}, acc, { [toggle]: true }), {});
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(toggles));
    });
    server.get('/syforest/sykmeldinger', (req, res) => {
        res.send(JSON.stringify(mockData.sykmeldinger));
    });

    server.get('/syforest/soknader/:uuid/berik', (req, res) => {
        res.send(JSON.stringify({"forrigeSykeforloepTom": null, "oppfoelgingsdato": "2018-09-19"}));
    });

    server.post('/syforest/soknader/:uuid/actions/beregn-arbeidsgiverperiode', (req, res) => {
        res.send(JSON.stringify({
            'erUtenforArbeidsgiverperiode': false,
            'antallDagerISykefravaer': 9,
            'forrigeSykeforloepTom': null,
            'startdato': '2018-09-19',
        }));
    });
    server.get('/syforest/soknader', (req, res) => {
        res.send(JSON.stringify(mockData.arbeidstakersoknader));
    });
    server.get('/syforest/naermesteledere', (req, res) => {
        res.send(JSON.stringify([]));
    });
    server.get('/oppfoelgingsdialogrest/api/sykmeldt/oppfoelgingsdialoger', (req, res) => {
        res.send(JSON.stringify([]));
    });
    server.get('/syforest/sykeforloep', (req, res) => {
        res.send(JSON.stringify([]));
    });
    server.post('/syforest/logging', (req, res) => {
        console.log(req.body);
        res.send(JSON.stringify({}));
    });
    server.get('/syforest/informasjon/hendelser', (req, res) => {
        res.send(JSON.stringify([]));
    });
    server.get('/syforest/informasjon/vedlikehold', (req, res) => {
        res.send(JSON.stringify({}));
    });

// END - MOCKS
    server.listen(8080, () => {
        console.log('App listening on port: 8080');
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

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0; v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
