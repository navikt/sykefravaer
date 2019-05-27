import {
    TID_INNSENDING_SYKMELDING,
    UTFYLLING_STARTET,
} from '../enums/metrikkerEnums';
import { hentEvent } from '../data/metrikker/metrikkerSelectors';
import { SYKMELDING_SENDT } from '../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';

const beregnMillisekunder = (start, slutt) => {
    return (slutt
        ? slutt.tid.getTime()
        : new Date().getTime()) - start.tid.getTime();
};

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
