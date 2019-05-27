import { EVENT_REGISTRERT } from './metrikker_actions';
import { SYKMELDING_BEKREFTET, SYKMELDING_SENDT } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';

const initiellState = {
    data: [],
};

const metrikker = (state = initiellState, action = {}) => {
    switch (action.type) {
        case EVENT_REGISTRERT: {
            return {
                data: [
                    ...state.data,
                    {
                        tid: new Date(),
                        ressursId: action.ressursId,
                        type: action.eventtype,
                    },
                ],
            };
        }
        case SYKMELDING_BEKREFTET:
        case SYKMELDING_SENDT: {
            return {
                data: [
                    ...state.data,
                    {
                        ressursId: action.sykmeldingId,
                        tid: new Date(),
                        type: SYKMELDING_SENDT,
                    },
                ],
            };
        }
        default: {
            return state;
        }
    }
};

export default metrikker;
