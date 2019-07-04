import { createReducer } from '../createReducer';
import { HENT_UNLEASH_TOGGLES_FEILET, HENTER_UNLEASH_TOGGLES, HENTET_UNLEASH_TOGGLES } from './unleashToggles_actions';

const initiellState = {
    data: {},
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

const unleashToggles = createReducer(
    HENT_UNLEASH_TOGGLES_FEILET,
    HENTER_UNLEASH_TOGGLES,
    HENTET_UNLEASH_TOGGLES,
    initiellState,
);

export default unleashToggles;
