const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockHentSykmeldinger(server) {
    server.get('/syfosmregister/api/v1/behandlingsutfall', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.SM_SYKMELDINGER]));
    });
}

function mockSmSykmeldingerLokalt(server) {
    mockHentSykmeldinger(server);

    server.post('/syfosmregister/api/v1/sykmeldinger/:id/lestAvBruker', (req, res) => {
        res.status(200);
        setTimeout(() => {
            res.send('');
        }, 4000);
    });
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
