import { SENDT } from '../../enums/soknadstatuser';

export const skalHenteSoknader = (state) => {
    return !state.soknader.hentet
        && !state.soknader.henter
        && !state.soknader.hentingFeilet;
};

export const skalHenteSoknaderHvisIkkeHenter = (state) => {
    return !state.soknader.henter;
};

export const sykmeldingHarBehandletSoknad = (state, sykmeldingId) => {
    return state.soknader.data.filter((soknad) => {
        return soknad.sykmeldingId === sykmeldingId && soknad.status === SENDT;
    }).length > 0;
};

export const hentSoknad = (state, soknad) => {
    return state.soknader.data.find((s) => {
        return s.id === soknad.id;
    });
};
