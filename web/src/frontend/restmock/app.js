const { sendSykmelding } = require('./actions/sykmeldingActions');
const { sendSykepengesoknad } = require('./actions/sykepengersoknadActions');

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const appData = {};
const SYKMELDINGER = 'sykmeldinger';
const SOKNADER = 'soknader';

const getJsonFil = (filnavn) => {
    return `${filnavn}.json`;
}

const lastFilTilMinne = (filnavn) => {
    fs.readFile(path.join(__dirname, `data/${getJsonFil(filnavn)}`), (err, data) => {
        if (err) throw err;
        appData[filnavn] = JSON.parse(data.toString());
    });
}

lastFilTilMinne(SYKMELDINGER);
lastFilTilMinne(SOKNADER);

app.get('/syforest/soknader/:soknadId/berik', (req, res) => {
    res.send(JSON.stringify({}));
});

app.post('/syforest/sykmeldinger/:sykmeldingId/actions/:endepunkt', (req, res) => {
    const { endepunkt, sykmeldingId } = req.params;

    switch (endepunkt) {
        case 'erUtenForVentetid': {
            res.send(true);
            break;
        }
        case 'send': {
            const { orgnummer } = req.body;
            appData.sykmeldinger = sendSykmelding(appData.sykmeldinger, sykmeldingId, orgnummer);
            res.send(200);
            break;
        }
        default: {
            console.log('Ukjent endepunkt for post mot ' + endepunkt);
            res.send(500);
            break;
        }
    }
});

app.post('/syforest/soknader/:soknadId/actions/:endepunkt', (req, res) => {
    const { endepunkt } = req.params;

    switch (endepunkt) {
        case 'send': {
            const soknadFraBruker = req.body;
            appData.soknader = sendSykepengesoknad(appData.soknader, soknadFraBruker);
            const soknad = appData.soknader.find((s) => {
                return s.id === soknadFraBruker.id;
            });
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(soknad));
            break;
        }
        default: {
            console.log('Ukjent endepunkt for post mot ' + endepunkt);
            res.send(200);
            break;
        }
    }
});

app.get(['/syforest/:filnavn', '/syforest/informasjon/:filnavn'], (req, res) => {
    const { filnavn } = req.params;

    res.setHeader('Content-Type', 'application/json');

    if ([SOKNADER, SYKMELDINGER].indexOf(filnavn) > -1) {
        res.send(JSON.stringify(appData[filnavn]));
    }

    const options = {
        root: path.join(__dirname, 'data'),
    };
    res.sendFile(getJsonFil(filnavn), options);
});

const port = 8182;

app.listen(port, () => {
    console.log(`Kjører mock av syforest på port ${port}`);
});
