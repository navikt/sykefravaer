/* eslint arrow-body-style: ["error", "as-needed"] */
import { TID_INNSENDING_SYKMELDING, UTFYLLING_STARTET } from '../../enums/metrikkerEnums';
import { SYKMELDING_BEKREFTET, SYKMELDING_SENDT } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';

export const hentEvents = (state, ressursId) => [...state.metrikker.data]
    .filter(e => e.ressursId === ressursId)
    .sort((a, b) => a.tid > b.tid);

export const hentEvent = (state, kriterier) => hentEvents(state, kriterier.ressursId)
    .filter(s => s.type === kriterier.type)
    .reverse()[0];

const beregnMillisekunder = (start, slutt) => (slutt
    ? slutt.tid.getTime()
    : new Date().getTime()) - start.tid.getTime();

export const beregnVarighet = (state, kriterier) => {
    const eventStart = hentEvent(state, {
        ressursId: kriterier.ressursId,
        type: UTFYLLING_STARTET,
    });

    switch (kriterier.type) {
        case TID_INNSENDING_SYKMELDING: {
            const eventSlutt = hentEvent(state, {
                ressursId: kriterier.ressursId,
                type: SYKMELDING_SENDT,
            });
            return beregnMillisekunder(eventStart, eventSlutt);
        }
        default: {
            return null;
        }
    }
};

export const hentMetrikk = (state, action) => {
    const hentMetrikktype = type => `SYKEFRAVAER_METRIKK__${type}`;

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
