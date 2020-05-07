const motebehovStatus = {
    visMotebehov: true,
    skjemaType: 'SVAR_BEHOV',
    motebehov: {
        arbeidstakerFnr: '02020212345',
        opprettetAv: '',
        virksomhetsnummer: '000111222',
        motebehovSvar: {
            harMotebehov: true,
        },
    },
};

const url = '/syfomotebehov/api/v2/arbeidstaker/motebehov'

function mockPilotEndepunkterForLokalmiljo(server) {
    server.get(url, (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(motebehovStatus));
    });
}

function mockPilotEndepunkterForOpplaeringsmiljo(server) {
    server.get(url, (req, res) => {
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
