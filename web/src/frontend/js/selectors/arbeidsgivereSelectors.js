import { harStrengtFortroligAdresse } from './brukerinfoSelectors';

export const skalHenteArbeidsgivere = (state, sykmeldingId) => {
    return state.arbeidsgivere.sykmeldingId !== sykmeldingId
        && !state.arbeidsgivere.henter
        && state.brukerinfo.bruker.hentet === true
        && !harStrengtFortroligAdresse(state);
};
