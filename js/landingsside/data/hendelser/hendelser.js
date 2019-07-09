/* eslint-disable arrow-body-style */

import { createReducer } from '../../../data/createReducer';
import { HENDELSER_HENTET, HENT_HENDELSER_FEILET, HENTER_HENDELSER } from './hendelserActions';

const MER_VEILEDNING = 'MER_VEILEDNING';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    hentet: false,
};

const hendelser = createReducer(
    HENT_HENDELSER_FEILET,
    HENTER_HENDELSER,
    HENDELSER_HENTET,
    initiellState,
    (hendelse) => {
        return {
            ...hendelse,
            inntruffetdato: new Date(hendelse.inntruffetdato),
        };
    });

export default hendelser;

export const selectHarMerVeiledningHendelse = (state) => {
    return state.hendelser.data
        .map(hendelse => hendelse.type)
        .some(type => type === MER_VEILEDNING);
};

export const selectAlleHarMerVeiledningIder = (state) => {
    return state.hendelser.data
        .filter(hendelse => hendelse.type === MER_VEILEDNING)
        .map(hendelse => hendelse.id);
};
