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
    (h) => {
        return {
            ...h,
            inntruffetdato: new Date(h.inntruffetdato),
        };
    });

export default hendelser;
