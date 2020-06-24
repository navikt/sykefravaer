const mockData = require('./mockData');
const enums = require('./mockDataEnums');

const mockSykmeldingerBackend = (server) => {
    server.get('/sykmeldinger-backend/api/v1/syforest/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SYKMELDINGER]));
    });
};

module.exports = mockSykmeldingerBackend;
