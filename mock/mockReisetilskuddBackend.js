const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const urlLokalt = '/reisetilskudd';
const urlOpplaeringsmiljo = '/flex-reisetilskudd-backend-mock/api/v1/reisetilskudd';

function hentReisetilskuddSoknader(server, miljo) {
    server.get(miljo, (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.REISETILSKUDDSOKNADER]));
    });
}

const mockReisetilskuddBackend = (server, erLokal) => {
    if (erLokal) {
        hentReisetilskuddSoknader(server, urlLokalt);
    } else {
        hentReisetilskuddSoknader(server, urlOpplaeringsmiljo);
    }
};

module.exports = mockReisetilskuddBackend;
