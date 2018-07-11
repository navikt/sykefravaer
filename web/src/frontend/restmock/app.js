const express = require('express');
const path = require('path');

const app = express();

const getJsonFil = (filnavn) => {
    return `${filnavn}.json`;
}

app.get('/syforest/soknader/:soknadId/berik', (req, res) => {
    res.send(JSON.stringify({}));
});

app.get('/syforest/informasjon/:filnavn', (req, res) => {
    const { filnavn } = req.params;
    const options = {
        root: path.join(__dirname, 'syforest/informasjon'),
    };
    res.sendFile(getJsonFil(filnavn), options);
});

app.post('/syforest/sykmeldinger/:sykmeldingId/actions/erUtenforVentetid', (req, res) => {
    res.send(true);
});

app.get('/:applikasjon/:filnavn', (req, res) => {
    const { applikasjon, filnavn } = req.params;
    const options = {
        root: path.join(__dirname, applikasjon),
    };
    res.sendFile(getJsonFil(filnavn), options);
});

const port = 8182;

app.listen(port, () => {
    console.log(`Kjører mock av syforest på port ${port}`);
});
