import { harStrengtFortroligAdresse } from './brukerinfoSelectors';

export const skalHenteArbeidsgivere = (state, sykmeldingId) => {
    return state.arbeidsgivere.sykmeldingId !== sykmeldingId
        && !harStrengtFortroligAdresse(state);
};
