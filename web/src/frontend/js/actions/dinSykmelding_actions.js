export function setArbeidssituasjon(arbeidssituasjon, sykmeldingId) {
    return {
        type: 'SET_ARBEIDSSITUASJON',
        arbeidssituasjon,
        sykmeldingId,
    };
}

export function setArbeidsgiver(sykmeldingId, arbeidsgiver) {
    return {
        type: 'SET_ARBEIDSGIVER',
        sykmeldingId,
        arbeidsgiver,
    };
}

export function senderSykmelding(sykmeldingId) {
    return {
        type: 'SENDER_SYKMELDING',
        sykmeldingId,
    };
}

export function sendSykmeldingFeilet(sykmeldingId) {
    return {
        type: 'SEND_SYKMELDING_FEILET',
        sykmeldingId,
    };
}

export function sykmeldingSendt(sykmeldingId) {
    return {
        type: 'SYKMELDING_SENDT',
        sykmeldingId,
    };
}

export function bekrefterSykmelding() {
    return {
        type: 'BEKREFTER_SYKMELDING',
    };
}

export function bekreftSykmeldingFeilet() {
    return {
        type: 'BEKREFT_SYKMELDING_FEILET',
    };
}

export function sykmeldingBekreftet(sykmeldingId) {
    return {
        type: 'SYKMELDING_BEKREFTET',
        sykmeldingId,
    };
}

export function avbryterSykmelding() {
    return {
        type: 'AVBRYTER_SYKMELDING',
    };
}

export function avbrytSykmeldingFeilet() {
    return {
        type: 'AVBRYT_SYKMELDING_FEILET',
    };
}

export function sykmeldingAvbrutt(sykmeldingId) {
    return {
        type: 'SYKMELDING_AVBRUTT',
        sykmeldingId,
    };
}

export function setOpplysningeneErRiktige(sykmeldingId, erRiktige) {
    return {
        type: 'SET_OPPLYSNINGENE_ER_RIKTIGE',
        sykmeldingId,
        erRiktige,
    };
}

export function setFeilaktigOpplysning(sykmeldingId, opplysning, erFeilaktig) {
    return {
        type: 'SET_FEILAKTIG_OPPLYSNING',
        opplysning,
        erFeilaktig,
        sykmeldingId,
    };
}

export function bekreftSykmelding(sykmeldingId, arbeidssituasjon = {}, feilaktigeOpplysninger = {}) {
    return {
        type: 'BEKREFT_SYKMELDING_FORESPURT',
        sykmeldingId,
        arbeidssituasjon,
        feilaktigeOpplysninger,
    };
}

export function sendSykmeldingTilArbeidsgiver(sykmeldingId, orgnummer, feilaktigeOpplysninger = {}, beOmNyNaermesteLeder = true) {
    return {
        type: 'SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT',
        sykmeldingId,
        orgnummer,
        feilaktigeOpplysninger,
        beOmNyNaermesteLeder,
    };
}

export function avbrytSykmelding(sykmeldingId, feilaktigeOpplysninger = {}) {
    return {
        type: 'AVBRYT_SYKMELDING_FORESPURT',
        sykmeldingId,
        feilaktigeOpplysninger,
    };
}
