const path = require('path');
const fs = require('fs');

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const mockData = {};
const ARBEIDSGIVERS_SYKMELDINGER = 'arbeidsgiversSykmeldinger';
const NY_SOKNAD_UTLAND = 'nySoknadUtland';
const ARBEIDSGIVERE = 'arbeidsgivere';
const METADATA = 'metadata';
const NAERMESTELEDERE = 'naermesteledere';
const OPPFOELGINGSDIALOGER = 'oppfoelgingsdialoger';
const UTLANDSOKNADER = 'soknadUtland';
const SYFOUNLEASH = 'syfounleash';
const SYKEFORLOEAP = 'sykeforloep';
const SYKEPENGESOKNADER = 'sykepengesoknader';
const SYKMELDINGER = 'sykmeldinger';
const TEKSTER = 'tekster';
const VARSLER = 'varsler';
const VEDLIKEHOLD = 'vedlikehold';
const TILGANG = 'tilgang';
const TOGGLES = 'toggles';
const ARBEIDSFORHOLD = 'arbeidsforhold';
const KONTAKTINFO = 'kontaktinfo';
const NAERMESTELEDER = 'naermesteleder';
const PERIODER = 'perioder';
const PERSON = 'person';
const PERSONVIRKSOMHETSNUMMER = 'personVirksomhetsnummer';
const VIRKSOMHET = 'virksomhet';

const lastFilTilMinne = (filnavn) => {
    fs.readFile(path.join(__dirname, `/test/mock/${filnavn}.json`), (err, data) => {
        if (err) throw err;
        mockData[filnavn] = JSON.parse(data.toString());
    });
};

lastFilTilMinne(ARBEIDSGIVERS_SYKMELDINGER);
lastFilTilMinne(NY_SOKNAD_UTLAND);
lastFilTilMinne(ARBEIDSGIVERE);
lastFilTilMinne(METADATA);
lastFilTilMinne(NAERMESTELEDERE);
lastFilTilMinne(OPPFOELGINGSDIALOGER);
lastFilTilMinne(UTLANDSOKNADER);
lastFilTilMinne(SYFOUNLEASH);
lastFilTilMinne(SYKEFORLOEAP);
lastFilTilMinne(SYKEPENGESOKNADER);
lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(TEKSTER);
lastFilTilMinne(VARSLER);
lastFilTilMinne(VEDLIKEHOLD);
lastFilTilMinne(TILGANG);
lastFilTilMinne(TOGGLES);
lastFilTilMinne(ARBEIDSFORHOLD);
lastFilTilMinne(KONTAKTINFO);
lastFilTilMinne(NAERMESTELEDER);
lastFilTilMinne(PERIODER);
lastFilTilMinne(PERSON);
lastFilTilMinne(PERSONVIRKSOMHETSNUMMER);
lastFilTilMinne(VIRKSOMHET);

function mockEndepunkterSomEndrerState(server) {
    server.post('/syfoapi/syfosoknad/api/opprettSoknadUtland', (req, res) => {
        if (!mockData.soknader.find((soknad) => {
            return soknad.id === mockData[NY_SOKNAD_UTLAND].id;
        })) {
            mockData.soknader = [...mockData.soknader, mockData[NY_SOKNAD_UTLAND]];
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[NY_SOKNAD_UTLAND]));
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
        const { id, sporsmal } = req.body;

        const soknadTilInnsending = mockData.soknader.find((soknad) => {
            return soknad.id === id;
        });

        mockData.soknader = mockData.soknader.map((soknad) => {
            const _soknad = Object.assign({}, soknad);

            if (soknad.id === id) {
                _soknad.status = 'SENDT';
                _soknad.sporsmal = sporsmal;
                _soknad.innsendtDato = new Date().toJSON()
                    .substr(0, 10);
            }

            if (soknad.id === soknadTilInnsending.korrigerer) {
                _soknad.korrigertAv = soknadTilInnsending.id;
                _soknad.status = 'KORRIGERT';
            }

            return _soknad;
        });

        res.send(JSON.stringify({}));
    });

    server.post('/syfoapi/syfosoknad/api/soknader/:id/korriger', (req, res) => {
        const { id } = req.params;
        const soknadSomKorrigeres = mockData.soknader.find((soknad) => {
            return soknad.id === id;
        });
        let utkast = mockData.soknader.find((soknad) => {
            return soknad.korrigerer === id;
        });

        if (!utkast) {
            utkast = Object.assign({}, soknadSomKorrigeres, {
                id: uuid(),
                status: 'UTKAST_TIL_KORRIGERING',
                opprettetDato: new Date().toJSON()
                    .substr(0, 10),
                innsendtDato: null,
                korrigerer: soknadSomKorrigeres.id,
            });
            mockData.soknader.push(utkast);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(utkast));
    });
}

function mockForOpplaeringsmiljo(server) {
    server.get('/syfotekster/api/tekster', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TEKSTER]));
    });

    server.get('/syfoapi/syfosoknad/api/soknader', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[UTLANDSOKNADER]));
    });

    server.post('/syfoapi/syfosoknad/api/oppdaterSporsmal', (req, res) => {
        const soknad = req.body;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(soknad));
    });

    server.post('/syfounleash/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYFOUNLEASH]));
    });

    server.get('/syforest/sykmeldinger?type=arbeidsgiver', (req, res) => {
        res.send(JSON.stringify(mockData[ARBEIDSGIVERS_SYKMELDINGER]));
    });

    server.get('/syforest/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYKMELDINGER]));
    });

    server.post('/syforest/sykmeldinger/:id/actions/erUtenforVentetid', (req, res) => {
        res.send(JSON.stringify({
            erUtenforVentetid: false,
        }));
    });

    server.get('/syforest/soknader/:uuid/berik', (req, res) => {
        res.send(JSON.stringify({
            forrigeSykeforloepTom: null,
            oppfoelgingsdato: '2018-09-19',
        }));
    });

    server.post('/syforest/soknader/:uuid/actions/beregn-arbeidsgiverperiode', (req, res) => {
        res.send(JSON.stringify({
            erUtenforArbeidsgiverperiode: false,
            antallDagerISykefravaer: 9,
            forrigeSykeforloepTom: null,
            startdato: '2018-09-19',
        }));
    });

    server.get('/syforest/soknader', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYKEPENGESOKNADER]));
    });

    server.get('/syforest/naermesteledere', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[NAERMESTELEDERE]));
    });

    server.get('/restoppfoelgingsdialog/api/sykmeldt/oppfoelgingsdialoger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[OPPFOELGINGSDIALOGER]));
    });

    server.get('/restoppfoelgingsdialog/api/tilgang', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TILGANG]));
    });

    server.get('/restoppfoelgingsdialog/api/virksomhet/:virksomhetsnummer', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[VIRKSOMHET]));
    });

    server.get('/restoppfoelgingsdialog/api/naermesteleder/:fnr/forrige', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({}));
    });

    server.post('/restoppfoelgingsdialog/api/oppfoelgingsdialoger/actions/:id/sett', (req, res) => {
        res.send();
    });


    server.get('/restoppfoelgingsdialog/api/arbeidsforhold', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[ARBEIDSFORHOLD]));
    });


    server.get('/restoppfoelgingsdialog/api/person/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSON]));
    });

    server.get('/restoppfoelgingsdialog/api/kontaktinfo/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[KONTAKTINFO]));
    });

    server.get('/restoppfoelgingsdialog/api/naermesteleder/:fnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[NAERMESTELEDER]));
    });

    server.get('/restoppfoelgingsdialog/api/person/:fnr?virksomhetsnummer=:vnr', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERSONVIRKSOMHETSNUMMER]));
    });

    server.get('/syforest/sykeforloep/siste/perioder', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[PERIODER]));
    });

    server.get('/syforest/sykeforloep', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[SYKEFORLOEAP]));
    });

    server.get('/syforest/sykeforloep/metadata', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[METADATA]));
    });

    server.post('/syforest/logging', (req, res) => {
        console.log(req.body);
        res.send(JSON.stringify({}));
    });

    server.get('/syforest/informasjon/hendelser', (req, res) => {
        res.send(JSON.stringify([]));
    });

    server.get('/syforest/informasjon/arbeidsgivere', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[ARBEIDSGIVERE]));
    });

    server.get('/syforest/informasjon/vedlikehold', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[VEDLIKEHOLD]));
    });

    server.get('/syforest/informasjon/bruker', (req, res) => {
        res.send(JSON.stringify({
            strengtFortroligAdresse: false,
        }));
    });

    server.get('/syforest/informasjon/toggles', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[TOGGLES]));
    });
}

module.exports = {
    mockForOpplaeringsmiljo,
    mockEndepunkterSomEndrerState,
};
