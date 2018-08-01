const sendSykepengesoknad = (sykepengesoknader, sykepengesoknadFraBruker) => {
    return sykepengesoknader.map((sykepengesoknad) => {
        if (sykepengesoknad.id === sykepengesoknadFraBruker.id) {
            return {
                ...sykepengesoknad,
                oppsummering: sykepengesoknadFraBruker.oppsummering,
                status: 'TIL_SENDING',
                arbeidsgiver: {
                    navn: 'TEAM SYKEFRAVÆRS RESTMOCK-BEDRIFT',
                    orgnummer: '999888777',
                    naermesteLeder: null,
                    stilling: null,
                },
                sendtTilArbeidsgiverDato: new Date(),
            };
        }
        return sykepengesoknad;
    });
}

module.exports = {
    sendSykepengesoknad,
};
