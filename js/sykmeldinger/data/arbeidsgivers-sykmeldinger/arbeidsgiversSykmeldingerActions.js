export const HENTER_ARBEIDSGIVERS_SYKMELDINGER = 'HENTER_ARBEIDSGIVERS_SYKMELDINGER';
export const HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET = 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET';
export const SET_ARBEIDSGIVERS_SYKMELDINGER = 'SET_ARBEIDSGIVERS_SYKMELDINGER';
export const HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT = 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT';

export function henterArbeidsgiversSykmeldinger() {
    return {
        type: HENTER_ARBEIDSGIVERS_SYKMELDINGER,
    };
}

export function hentArbeidsgiversSykmeldingerFeilet() {
    return {
        type: HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET,
    };
}

export function setArbeidsgiversSykmeldinger(sykmeldinger = []) {
    return {
        type: SET_ARBEIDSGIVERS_SYKMELDINGER,
        sykmeldinger,
    };
}

export function hentArbeidsgiversSykmeldinger() {
    return {
        type: HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT,
    };
}
