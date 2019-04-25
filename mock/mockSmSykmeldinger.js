const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockHentSykmeldinger(server) {
    server.get('/syfoapi/sykmeldinger', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SM_SYKMELDINGER]));
    });
}

function mockSmSykmeldingerLokalt(server) {
    mockHentSykmeldinger(server);
}

function mockSmSykmeldingerOpplaeringsmiljo(server) {
    mockHentSykmeldinger(server);
}

const mockSmSykmeldinger = (server, erLokal) => {
    if (erLokal) {
        mockSmSykmeldingerLokalt(server);
    } else {
        mockSmSykmeldingerOpplaeringsmiljo(server);
    }
};

module.exports = mockSmSykmeldinger;
