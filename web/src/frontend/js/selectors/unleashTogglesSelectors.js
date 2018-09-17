/*

Liste av funksjoner her, f.eks:

export const toggleSelvstendigSoknad = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[SELVSTENDIG_FRILANSER_SOKNAD_TOGGLE] === true;
};

*/

import { SYKMELDING_ARBEIDSSITUASJON } from '../enums/unleashToggles';

export const toggleSykmeldingEndreArbeidssituasjon = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[SYKMELDING_ARBEIDSSITUASJON] === true;
};
