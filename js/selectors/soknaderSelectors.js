import { SELVSTENDIGE_OG_FRILANSERE, OPPHOLD_UTLAND } from '../enums/soknadtyper';
import { FREMTIDIG, NY, SENDT } from '../enums/soknadstatuser';

export const erForsteSoknad = (state) => {
    const selvstendigSoknader = state.soknader.data.filter((s) => {
        return s.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
    });
    return selvstendigSoknader.filter((s) => {
        return s.status === NY || s.status === FREMTIDIG;
    }).length === selvstendigSoknader.length;
};

export const skalHenteSoknader = (state) => {
    return !state.soknader.hentet
        && !state.soknader.henter
        && !state.soknader.hentingFeilet;
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

export const hentSoknaderSelector = (state) => {
    return state.soknader.data.filter((soknad) => {
        return soknad.soknadstype === OPPHOLD_UTLAND
            || soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
    });
};
