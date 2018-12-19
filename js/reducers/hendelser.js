/* eslint-disable arrow-body-style */

import * as actiontyper from '../actions/actiontyper';
import { createReducer } from './createReducer';

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

export const harMerVeiledingHendelse = (state) => {
    return state.hendelser.data
        .map(hendelse => hendelse.type)
        .some(type => type === 'MER_VEILEDNING');
};
