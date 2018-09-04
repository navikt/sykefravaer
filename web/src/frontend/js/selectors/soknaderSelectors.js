import { SELVSTENDIGE_OG_FRILANSERE } from '../enums/soknadtyper';
import { FREMTIDIG, NY } from '../enums/soknadstatuser';

export const erForsteSoknad = (state) => {
    const selvstendigSoknader = state.soknader.data.filter((s) => {
        return s.soknadstype === SELVSTENDIGE_OG_FRILANSERE;
    });
    return selvstendigSoknader.filter((s) => {
        return s.status === NY || s.status === FREMTIDIG;
    }).length === selvstendigSoknader.length;
};

export const skalHenteSoknader = (state) => {
    return !state.soknader.hentet && !state.soknader.henter;
};

export const sykmeldingHarSoknad = (state, sykmeldingId) => {
    return state.soknader.data.filter((s) => {
        return s.sykmeldingId === sykmeldingId;
    }).length > 0;
};

export const hentSoknad = (state, soknad) => {
    return state.soknader.data.find((s) => {
        return s.id === soknad.id;
    });
};
