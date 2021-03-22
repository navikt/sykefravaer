const mockData = require('./mockData');
const enums = require('./mockDataEnums');

// eslint-disable-next-line no-unused-vars
const mockSykmeldingerBackend = (server, erLokal) => {
    server.get('/sykmeldinger-backend/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
    });
    server.get('/sykmeldinger-backend/brukerinformasjon', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ navn: 'Ola', alder: 32 }));
    });
    server.get('/sykmeldinger-backend/arbeidsforhold', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.ARBEIDSGIVERE]));
    });
};

module.exports = mockSykmeldingerBackend;
