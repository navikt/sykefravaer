import { harStrengtFortroligAdresseSelector } from '../../../data/brukerinfo/brukerinfoSelectors';

export const skalHenteArbeidsgivere = (state, sykmeldingId) => state.arbeidsgivere.sykmeldingId !== sykmeldingId
        && !state.arbeidsgivere.henter
        && state.brukerinfo.bruker.hentet === true
        && !harStrengtFortroligAdresseSelector(state);
