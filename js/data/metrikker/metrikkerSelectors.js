import { beregnVarighet } from '../../utils/metrikkerUtils';
import {
    TID_INNSENDING_SYKMELDING,
} from '../../enums/metrikkerEnums';
import { SYKMELDING_BEKREFTET, SYKMELDING_SENDT } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';

export const hentEvents = (state, ressursId) => {
    return [...state.metrikker.data]
        .filter((e) => {
            return e.ressursId === ressursId;
        })
        .sort((a, b) => {
            return a.tid > b.tid;
        });
};

export const hentEvent = (state, kriterier) => {
    return hentEvents(state, kriterier.ressursId)
        .filter((s) => {
            return s.type === kriterier.type;
        })
        .reverse()[0];
};

export const hentMetrikk = (state, action) => {
    const hentMetrikktype = (type) => {
        return `SYKEFRAVAER_METRIKK__${type}`;
    };

    switch (action.type) {
        case SYKMELDING_BEKREFTET:
        case SYKMELDING_SENDT: {
            const tid = beregnVarighet(state, {
                ressursId: action.sykmeldingId,
                type: TID_INNSENDING_SYKMELDING,
            });
            return {
                type: hentMetrikktype(SYKMELDING_SENDT),
                data: {
                    tid,
                },
            };
        }
        default: {
            return null;
        }
    }
};
