function mockRegistrerEgenSykmelding(server) {
    server.post('/egenmeldt-sykmelding-backend/sykmelding/egenmeldt', (req, res) => {
        res.status(200);
        setTimeout(() => {
            res.send('');
        }, 1000);
    });
}

module.exports = mockRegistrerEgenSykmelding;
