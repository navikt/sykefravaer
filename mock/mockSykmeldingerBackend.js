const mockData = require('./mockData');
const enums = require('./mockDataEnums');

// eslint-disable-next-line no-unused-vars
const mockSykmeldingerBackend = (server, erLokal) => {
    server.get('/sykmeldinger-backend/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
    });
};

module.exports = mockSykmeldingerBackend;
