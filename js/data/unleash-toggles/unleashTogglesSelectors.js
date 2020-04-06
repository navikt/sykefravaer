/*

Liste av funksjoner her, f.eks:

export const toggleSelvstendigSoknad = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[SELVSTENDIG_FRILANSER_SOKNAD_TOGGLE] === true;
};

*/

import {
    AKTIVITETSKRAV_INFORMASJON,
    SYKMELDING_ARBEIDSSITUASJON,
    NY_ARBEIDSTAKERSOKNAD,
    NYTT_SYKMELDINGSMOTTAK,
    NGINX_PROXY,
} from '../../enums/unleashToggles';

export const toggleSykmeldingEndreArbeidssituasjon = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[SYKMELDING_ARBEIDSSITUASJON] === true;
};

export const toggleNyArbeidstakerSoknad = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[NY_ARBEIDSTAKERSOKNAD] === true;
};

export const toggleNyttSykmeldingsmottak = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[NYTT_SYKMELDINGSMOTTAK] === true;
};

export const unleashtogglesHentetSelector = (state) => {
    return state.unleashToggles.hentet;
};

export const toggleBrukNginxProxy = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[NGINX_PROXY] === true;
};

export const skalViseAktivitetskravInformasjon = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[AKTIVITETSKRAV_INFORMASJON] === true;
};
