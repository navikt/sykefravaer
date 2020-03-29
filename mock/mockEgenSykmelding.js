const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockRegistrerEgenSykmelding(server) {
    server.post(
        '/egenmeldt-sykmelding-backend/api/v1/sykmelding/egenmeldt',
        (req, res) => {
            res.status(200);
            setTimeout(() => {
                res.send('');
            }, 2000);
        },
    );

    server.get(
        '/egenmeldt-sykmelding-backend/api/v1/arbeidsforhold',
        (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            setTimeout(() => {
                res.send(JSON.stringify(mockData[enums.ARBEIDSGIVERE]));
            }, 1000);
        },
    );
}

module.exports = mockRegistrerEgenSykmelding;
