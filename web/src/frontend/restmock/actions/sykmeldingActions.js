const sendSykmelding = (sykmeldinger, sykmeldingId, orgnummer) => {
    return sykmeldinger.map((s) => {
        if (s.id === sykmeldingId) {
            return {
                ...s,
                orgnummer,
                innsendtArbeidsgivernavn: 'TEAM SYKEFRAVÆRS RESTMOCK-BEDRIFT',
                mottakendeArbeidsgiver: {
                    navn: 'TEAM SYKEFRAVÆRS RESTMOCK-BEDRIFT',
                    virksomhetsnummer: '999888777',
                    juridiskOrgnummer: orgnummer,
                },
                sendtdato: new Date(),
                sporsmal: {
                    arbeidssituasjon: 'ARBEIDSTAKER',
                },
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                status: 'SENDT',
            };
        }
        return s;
    });
};

module.exports = { sendSykmelding };
