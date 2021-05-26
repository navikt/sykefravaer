const mockData = require('./mockData');
const enums = require('./mockDataEnums');


const mockNarmesteleder = (server) => {
    server.get('/narmesteleder/syforest/narmesteledere', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockData[enums.NAERMESTELEDERE]));
    });
};

module.exports = mockNarmesteleder;
