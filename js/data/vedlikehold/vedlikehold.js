import { createReducer } from '../createReducer';
import { HENT_VEDLIKEHOLD_FEILET, HENTER_VEDLIKEHOLD, VEDLIKEHOLD_HENTET } from './vedlikehold_actions';

const defaultState = {
    data: {},
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

const vedlikehold = createReducer(
    HENT_VEDLIKEHOLD_FEILET,
    HENTER_VEDLIKEHOLD,
    VEDLIKEHOLD_HENTET,
    defaultState,
);

export default vedlikehold;
