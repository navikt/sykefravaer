const express = require('express');
const mockSyfooppfolgingsplanservice = require('./mockSyfooppfolgingsplanservice');
const mockSyfomoteadmin = require('./mockSyfomoteadmin');
const mockSyfomotebehov = require('./mockSyfomotebehov');
const mockSyforest = require('./mockSyforest');
const mockSyfoservicestrangler = require('./mockSyfoservicestrangler');
const mockSyfosoknad = require('./mockSyfosoknad');
const mockSyfotekster = require('./mockSyfotekster');
const mockSyfounleash = require('./mockSyfounleash');
const mockVeilarboppfolging = require('./mockVeilarboppfolging');
const mockVeilarbregistrering = require('./mockVeilarbregistrering');
const mockSmSykmeldinger = require('./mockSmSykmeldinger');
const mockRegistrerEgenSykmelding = require('./mockEgenSykmelding');

function mockEndepunkter(server, erLokal) {
    server.use(express.json());
    server.use(express.urlencoded());

    server.get('/esso/logout', (req, res) => {
        res.send('<p>Du har blitt sendt til utlogging.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>');
    });

    server.get('/dittnav', (req, res) => {
        res.send('<p>Ditt Nav er ikke tilgjengelig - dette er en testside som kun viser Ditt sykefravær.</p><p><a href="/sykefravaer">Gå til Ditt sykefravær</a></p>');
    });

    [
        mockSyfooppfolgingsplanservice,
        mockSyfomoteadmin,
        mockSyfomotebehov,
        mockSyforest,
        mockSyfoservicestrangler,
        mockSyfosoknad,
        mockSyfotekster,
        mockSyfounleash,
        mockVeilarboppfolging,
        mockVeilarbregistrering,
        mockSmSykmeldinger,
        mockRegistrerEgenSykmelding,
    ].forEach((func) => {
        func(server, erLokal);
    });
}

module.exports = mockEndepunkter;
