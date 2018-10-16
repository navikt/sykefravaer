import * as actiontyper from './actiontyper';

export function henterArbeidsgiversSykmeldinger() {
    return {
        type: actiontyper.HENTER_ARBEIDSGIVERS_SYKMELDINGER,
    };
}

export function hentArbeidsgiversSykmeldingerFeilet() {
    return {
        type: actiontyper.HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET,
    };
}

export function setArbeidsgiversSykmeldinger(sykmeldinger = []) {
    return {
        type: actiontyper.SET_ARBEIDSGIVERS_SYKMELDINGER,
        sykmeldinger,
    };
}

export function hentArbeidsgiversSykmeldinger() {
    return {
        type: actiontyper.HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT,
    };
}
