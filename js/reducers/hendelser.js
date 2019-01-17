/* eslint-disable arrow-body-style */

import * as actiontyper from '../actions/actiontyper';
import { createReducer } from './createReducer';

const MER_VEILEDNING = 'MER_VEILEDNING';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    hentet: false,
};

const hendelser = createReducer(
    actiontyper.HENT_HENDELSER_FEILET,
    actiontyper.HENTER_HENDELSER,
    actiontyper.HENDELSER_HENTET,
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
