const mockData = require('./mockData');
const enums = require('./mockDataEnums');

function mockRegistrerEgenSykmelding(server) {
    // Error mocks start
    server.post(
        '/egenmeldt-sykmelding-backend/api/v1/sykmelding/egenmeldt/formerror',
        (req, res) => {
            res.status(202);
            setTimeout(() => {
                res.send({
                    errorCode: 'OVERLAPPER_MED_ANDRE_SYKMELDINGSPERIODER',
                    description: 'Du kan kun benytte egenmeldt sykmelding én gang',
                });
            }, 0);
        },
    );
    server.post(
        '/egenmeldt-sykmelding-backend/api/v1/sykmelding/egenmeldt/kvitteringerror',
        (req, res) => {
            res.status(202);
            setTimeout(() => {
                res.send({
                    errorCode: 'TOM_ER_FOR_FOM',
                    description: 'Tom er før fom',
                });
            }, 0);
        },
    );
    // Error mocks end

    server.post(
        '/egenmeldt-sykmelding-backend/api/v1/sykmelding/egenmeldt',
        (req, res) => {
            res.status(200);
            setTimeout(() => {
                res.send('');
            }, 2000);
        },
    );

    server.post(
        '/egenmeldt-sykmelding-backend/sykmeldinger/invaliderSesjon',
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
