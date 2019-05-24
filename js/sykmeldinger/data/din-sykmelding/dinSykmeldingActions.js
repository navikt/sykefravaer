export const SET_ARBEIDSSITUASJON = 'SET_ARBEIDSSITUASJON';
export const SET_ARBEIDSGIVER = 'SET_ARBEIDSGIVER';
export const SENDER_SYKMELDING = 'SENDER_SYKMELDING';
export const SEND_SYKMELDING_FEILET = 'SEND_SYKMELDING_FEILET';
export const SYKMELDING_SENDT = 'SYKMELDING_SENDT';
export const BEKREFTER_SYKMELDING = 'BEKREFTER_SYKMELDING';
export const BEKREFT_SYKMELDING_FEILET = 'BEKREFT_SYKMELDING_FEILET';
export const SYKMELDING_BEKREFTET = 'SYKMELDING_BEKREFTET';
export const AVBRYTER_SYKMELDING = 'AVBRYTER_SYKMELDING';
export const AVBRYT_SYKMELDING_FEILET = 'AVBRYT_SYKMELDING_FEILET';
export const SYKMELDING_AVBRUTT = 'SYKMELDING_AVBRUTT';
export const GJENAAPNER_SYKMELDING = 'GJENAAPNER_SYKMELDING';
export const GJENAAPNE_SYKMELDING_FEILET = 'GJENAAPNE_SYKMELDING_FEILET';
export const SYKMELDING_GJENAAPNET = 'SYKMELDING_GJENAAPNET';
export const ANGRER_BEKREFT_SYKMELDING = 'ANGRER_BEKREFT_SYKMELDING';
export const ANGRE_BEKREFT_SYKMELDING_FEILET = 'ANGRE_BEKREFTET_SYKMELDING_FEILET';
export const BEKREFT_SYKMELDING_ANGRET = 'BEKREFT_SYKMELDING_ANGRET';
export const ANGRE_BEKREFT_SYKMELDING_FORESPURT = 'ANGRE_BEKREFT_SYKMELDING_FORESPURT';
export const SET_OPPLYSNINGENE_ER_RIKTIGE = 'SET_OPPLYSNINGENE_ER_RIKTIGE';
export const SET_FEILAKTIG_OPPLYSNING = 'SET_FEILAKTIG_OPPLYSNING';
export const BEKREFT_SYKMELDING_FORESPURT = 'BEKREFT_SYKMELDING_FORESPURT';
export const SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT = 'SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT';
export const AVBRYT_SYKMELDING_FORESPURT = 'AVBRYT_SYKMELDING_FORESPURT';
export const GJENAAPNE_SYKMELDING_FORESPURT = 'GJENAAPNE_SYKMELDING_FORESPURT';

export function setArbeidssituasjon(arbeidssituasjon, sykmeldingId) {
    return {
        type: SET_ARBEIDSSITUASJON,
        arbeidssituasjon,
        sykmeldingId,
    };
}

export function setArbeidsgiver(sykmeldingId, arbeidsgiver) {
    return {
        type: SET_ARBEIDSGIVER,
        sykmeldingId,
        arbeidsgiver,
    };
}

export function senderSykmelding(sykmeldingId) {
    return {
        type: SENDER_SYKMELDING,
        sykmeldingId,
    };
}

export function sendSykmeldingFeilet(sykmeldingId) {
    return {
        type: SEND_SYKMELDING_FEILET,
        sykmeldingId,
    };
}

export function sykmeldingSendt(sykmeldingId) {
    return {
        type: SYKMELDING_SENDT,
        sykmeldingId,
    };
}

export function bekrefterSykmelding() {
    return {
        type: BEKREFTER_SYKMELDING,
    };
}

export function bekreftSykmeldingFeilet() {
    return {
        type: BEKREFT_SYKMELDING_FEILET,
    };
}

export function sykmeldingBekreftet(sykmeldingId) {
    return {
        type: SYKMELDING_BEKREFTET,
        sykmeldingId,
    };
}

export function avbryterSykmelding() {
    return {
        type: AVBRYTER_SYKMELDING,
    };
}

export function avbrytSykmeldingFeilet() {
    return {
        type: AVBRYT_SYKMELDING_FEILET,
    };
}

export function sykmeldingAvbrutt(sykmeldingId) {
    return {
        type: SYKMELDING_AVBRUTT,
        sykmeldingId,
    };
}

export function avbrytSykmelding(sykmeldingId, feilaktigeOpplysninger = {}) {
    return {
        type: AVBRYT_SYKMELDING_FORESPURT,
        sykmeldingId,
        feilaktigeOpplysninger,
    };
}

export function gjenaapnerSykmelding() {
    return {
        type: GJENAAPNER_SYKMELDING,
    };
}

export function gjenaapneSykmeldingFeilet() {
    return {
        type: GJENAAPNE_SYKMELDING_FEILET,
    };
}

export function sykmeldingGjenaapnet(sykmeldingId) {
    return {
        type: SYKMELDING_GJENAAPNET,
        sykmeldingId,
    };
}

export function gjenaapneSykmelding(sykmeldingId) {
    return {
        type: GJENAAPNE_SYKMELDING_FORESPURT,
        sykmeldingId,
    };
}

export function angrerBekreftSykmelding() {
    return {
        type: ANGRER_BEKREFT_SYKMELDING,
    };
}

export function angreBekreftSykmeldingFeilet() {
    return {
        type: ANGRE_BEKREFT_SYKMELDING_FEILET,
    };
}

export function bekreftSykmeldingAngret(sykmeldingId) {
    return {
        type: BEKREFT_SYKMELDING_ANGRET,
        sykmeldingId,
    };
}

export function angreBekreftSykmelding(sykmeldingId) {
    return {
        type: ANGRE_BEKREFT_SYKMELDING_FORESPURT,
        sykmeldingId,
    };
}

export function setOpplysningeneErRiktige(sykmeldingId, erRiktige) {
    return {
        type: SET_OPPLYSNINGENE_ER_RIKTIGE,
        sykmeldingId,
        erRiktige,
    };
}

export function setFeilaktigOpplysning(sykmeldingId, opplysning, erFeilaktig) {
    return {
        type: SET_FEILAKTIG_OPPLYSNING,
        opplysning,
        erFeilaktig,
        sykmeldingId,
    };
}

export function bekreftSykmelding(sykmeldingId, verdier = {}) {
    return {
        type: BEKREFT_SYKMELDING_FORESPURT,
        sykmeldingId,
        verdier,
    };
}

export function sendSykmeldingTilArbeidsgiver(sykmeldingId, orgnummer, feilaktigeOpplysninger = {}, beOmNyNaermesteLeder = true) {
    return {
        type: SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT,
        sykmeldingId,
        orgnummer,
        feilaktigeOpplysninger,
        beOmNyNaermesteLeder,
    };
}
