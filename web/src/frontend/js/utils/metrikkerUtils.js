import { TID_INNSENDING_SYKEPENGESOKNAD_ARBEIDSTAKER, TID_INNSENDING_SYKEPENGESOKNAD_SELVSTENDIG, TID_INNSENDING_SYKMELDING, UTFYLLING_STARTET } from '../enums/metrikkerEnums';
import { SOKNAD_SENDT, SYKEPENGESOKNAD_SENDT, SYKMELDING_SENDT } from '../actions/actiontyper';
import { hentEvent } from '../selectors/metrikkerSelectors';

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
        case TID_INNSENDING_SYKEPENGESOKNAD_ARBEIDSTAKER: {
            const eventSlutt = hentEvent(state, {
                ressursId: kriterier.ressursId,
                type: SYKEPENGESOKNAD_SENDT,
            });
            return beregnMillisekunder(eventStart, eventSlutt);
        }
        case TID_INNSENDING_SYKEPENGESOKNAD_SELVSTENDIG: {
            const eventSlutt = hentEvent(state, {
                ressursId: kriterier.ressursId,
                type: SOKNAD_SENDT,
            });
            return beregnMillisekunder(eventStart, eventSlutt);
        }
        default: {
            return null;
        }
    }
};
