const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const urlLokalt = '/vedtak';
const urlOpplaeringsmiljo = '/spinnsyn-backend-mock/api/v1/vedtak';

function hentVedtak(server, miljo) {
    server.get(miljo, (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.VEDTAK]));
    });
}

const mockSpinnsynBackend = (server, erLokal) => {
    if (erLokal) {
        hentVedtak(server, urlLokalt);
    } else {
        hentVedtak(server, urlOpplaeringsmiljo);
    }
};

module.exports = mockSpinnsynBackend;
