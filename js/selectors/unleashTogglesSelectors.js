/*

Liste av funksjoner her, f.eks:

export const toggleSelvstendigSoknad = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[SELVSTENDIG_FRILANSER_SOKNAD_TOGGLE] === true;
};

*/

import { SYKMELDING_ARBEIDSSITUASJON, NY_ARBEIDSTAKERSOKNAD } from '../enums/unleashToggles';

export const toggleSykmeldingEndreArbeidssituasjon = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[SYKMELDING_ARBEIDSSITUASJON] === true;
};

export const toggleNyArbeidstakerSoknad = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[NY_ARBEIDSTAKERSOKNAD] === true;
};
