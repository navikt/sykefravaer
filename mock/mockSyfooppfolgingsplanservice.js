const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockSyfooppfolgingsplanservice(server) {
    server.get('/syfooppfolgingsplanservice/api/arbeidstaker/oppfolgingsplaner', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.OPPFOELGINGSDIALOGER]));
    });
}

module.exports = mockSyfooppfolgingsplanservice;
