import {
    SELVSTENDIG_FRILANSER_SOKNAD_TOGGLE,
    UTENLANDSOPPHOLD_SOKNAD_TOGGLE,
} from '../enums/unleashToggles';

export const toggleSelvstendigSoknad = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[SELVSTENDIG_FRILANSER_SOKNAD_TOGGLE] === true;
};

export const toggleSykepengesoknadUtland = (state) => {
    return !state.unleashToggles.hentingFeilet
        && state.unleashToggles.data[UTENLANDSOPPHOLD_SOKNAD_TOGGLE] === true;
};
