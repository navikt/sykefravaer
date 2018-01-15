import * as actiontyper from './actiontyper';

export function setArbeidssituasjon(arbeidssituasjon, sykmeldingId) {
    return {
        type: actiontyper.SET_ARBEIDSSITUASJON,
        arbeidssituasjon,
        sykmeldingId,
    };
}

export function setArbeidsgiver(sykmeldingId, arbeidsgiver) {
    return {
        type: actiontyper.SET_ARBEIDSGIVER,
        sykmeldingId,
        arbeidsgiver,
    };
}

export function senderSykmelding(sykmeldingId) {
    return {
        type: actiontyper.SENDER_SYKMELDING,
        sykmeldingId,
    };
}

export function sendSykmeldingFeilet(sykmeldingId) {
    return {
        type: actiontyper.SEND_SYKMELDING_FEILET,
        sykmeldingId,
    };
}

export function sykmeldingSendt(sykmeldingId) {
    return {
        type: actiontyper.SYKMELDING_SENDT,
        sykmeldingId,
    };
}

export function bekrefterSykmelding() {
    return {
        type: actiontyper.BEKREFTER_SYKMELDING,
    };
}

export function bekreftSykmeldingFeilet() {
    return {
        type: actiontyper.BEKREFT_SYKMELDING_FEILET,
    };
}

export function sykmeldingBekreftet(sykmeldingId) {
    return {
        type: actiontyper.SYKMELDING_BEKREFTET,
        sykmeldingId,
    };
}

export function avbryterSykmelding() {
    return {
        type: actiontyper.AVBRYTER_SYKMELDING,
    };
}

export function avbrytSykmeldingFeilet() {
    return {
        type: actiontyper.AVBRYT_SYKMELDING_FEILET,
    };
}

export function sykmeldingAvbrutt(sykmeldingId) {
    return {
        type: actiontyper.SYKMELDING_AVBRUTT,
        sykmeldingId,
    };
}

export function gjenaapnerSykmelding() {
    return {
        type: actiontyper.GJENAAPNER_SYKMELDING,
    };
}

export function gjenaapneSykmeldingFeilet() {
    return {
        type: actiontyper.GJENAAPNE_SYKMELDING_FEILET,
    };
}

export function sykmeldingGjenaapnet(sykmeldingId) {
    return {
        type: actiontyper.SYKMELDING_GJENAAPNET,
        sykmeldingId,
    };
}

export function setOpplysningeneErRiktige(sykmeldingId, erRiktige) {
    return {
        type: actiontyper.SET_OPPLYSNINGENE_ER_RIKTIGE,
        sykmeldingId,
        erRiktige,
    };
}

export function setFeilaktigOpplysning(sykmeldingId, opplysning, erFeilaktig) {
    return {
        type: actiontyper.SET_FEILAKTIG_OPPLYSNING,
        opplysning,
        erFeilaktig,
        sykmeldingId,
    };
}

export function bekreftSykmelding(sykmeldingId, arbeidssituasjon = {}, feilaktigeOpplysninger = {}) {
    return {
        type: actiontyper.BEKREFT_SYKMELDING_FORESPURT,
        sykmeldingId,
        arbeidssituasjon,
        feilaktigeOpplysninger,
    };
}

export function sendSykmeldingTilArbeidsgiver(sykmeldingId, orgnummer, feilaktigeOpplysninger = {}, beOmNyNaermesteLeder = true) {
    return {
        type: actiontyper.SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT,
        sykmeldingId,
        orgnummer,
        feilaktigeOpplysninger,
        beOmNyNaermesteLeder,
    };
}

export function avbrytSykmelding(sykmeldingId, feilaktigeOpplysninger = {}) {
    return {
        type: actiontyper.AVBRYT_SYKMELDING_FORESPURT,
        sykmeldingId,
        feilaktigeOpplysninger,
    };
}

export function gjenaapneSykmelding(sykmeldingId) {
    return {
        type: actiontyper.GJENAAPNE_SYKMELDING_FORESPURT,
        sykmeldingId,
    };
}
