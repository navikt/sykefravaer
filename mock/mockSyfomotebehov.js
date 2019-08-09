const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockPilotEndepunkterForLokalmiljo(server) {
    server.get('/syfomotebehov/api/motebehov', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.MOTEBEHOV]));
    });
}

function mockPilotEndepunkterForOpplaeringsmiljo(server) {
    server.get('/syfomotebehov/api/motebehov', (req, res) => {
        res.status(403);
        res.send();
    });
}

function mockSyfomotebehov(server, erLokal) {
    if (erLokal) {
        mockPilotEndepunkterForLokalmiljo(server);
    } else {
        mockPilotEndepunkterForOpplaeringsmiljo(server);
    }
}

module.exports = mockSyfomotebehov;
