import {
    lagJsDate,
    newDate,
} from './datoUtils';
import { BRUKER, ARBEIDSGIVER } from '../enums/moteplanleggerDeltakerTyper';

export const SVARSKJEMANAVN = 'SVAR_PÅ_FORESPØRSEL';
export const AVBRUTT = 'AVBRUTT';
export const MOTESTATUS = 'MØTESTATUS';
export const BEKREFTET = 'BEKREFTET';
export const SKJEMA = 'SKJEMA';

export const roller = {};
roller[BRUKER] = 'Arbeidstaker';
roller[ARBEIDSGIVER] = 'Arbeidsgiver';

export const MULIGE_SVAR = {
    IKKE_SVART: 'IKKE_SVART',
    PASSER: 'PASSER',
    PASSER_IKKE: 'PASSER_IKKE',
};

export const erMotePassert = (mote) => {
    if (!mote) {
        return false;
    }
    if (mote.bekreftetAlternativ && mote.bekreftetAlternativ.tid <= newDate()) {
        return true;
    }
    const antallAlternativer = mote.alternativer.length;
    return mote.alternativer.filter((alternativ) => {
        return alternativ.tid <= newDate();
    }).length === antallAlternativer;
};

export const getMote = (state) => {
    return state.mote && state.mote.data;
};

export const brukerHarSvart = (svartidspunkt, created) => {
    if (!svartidspunkt) {
        return false;
    }
    return new Date(svartidspunkt) > new Date(created);
};

export const getSvar = ({ valgt, created }, svartidspunkt) => {
    if (!brukerHarSvart(svartidspunkt, created)) {
        return MULIGE_SVAR.IKKE_SVART;
    }
    return valgt ? MULIGE_SVAR.PASSER : MULIGE_SVAR.PASSER_IKKE;
};

export const getNyeAlternativer = (mote, deltakertype = BRUKER) => {
    const innloggetBruker = mote.deltakere.filter((deltaker) => {
        return deltaker.type === deltakertype;
    })[0];
    return mote.alternativer.filter((alternativ) => {
        return alternativ.created > innloggetBruker.svartidspunkt;
    });
};

export const getTidligereAlternativer = (mote, deltakertype = BRUKER) => {
    const innloggetBruker = mote.deltakere.filter((deltaker) => {
        return deltaker.type === deltakertype;
    })[0];
    return mote.alternativer.filter((alternativ) => {
        return alternativ.created < innloggetBruker.svartidspunkt;
    });
};

export const finnDeltakerByType = (deltakere, deltakertype) => {
    return deltakere.filter((deltaker) => {
        return deltaker.type === deltakertype ? 1 : 0;
    })[0];
};

export const finnNyesteAlternativ = (alternativer) => {
    return [...alternativer].sort((m1, m2) => {
        return m2.created - m1.created;
    })[0];
};

export const getSvarsideModus = (mote, deltakertype = BRUKER) => {
    if (!mote) {
        return undefined;
    }
    if (mote.status === AVBRUTT) {
        return AVBRUTT;
    }
    if (mote.status === BEKREFTET && mote.alternativer.filter((alternativ) => {
        return alternativ.created > mote.bekreftetTidspunkt;
    }).length === 0) {
        return BEKREFTET;
    }
    const deltaker = finnDeltakerByType(mote.deltakere, deltakertype);
    const alleAlternativerErBesvart = mote.alternativer.filter((alternativ) => {
        const svar = deltaker.svar.filter((s) => {
            return s.id === alternativ.id;
        })[0];
        return !brukerHarSvart(deltaker.svartidspunkt, svar.created);
    }).length === 0;
    if (alleAlternativerErBesvart) {
        return MOTESTATUS;
    }
    return SKJEMA;
};

export const konverterTid = (mote) => {
    return Object.assign({}, mote, {
        opprettetTidspunkt: lagJsDate(mote.opprettetTidspunkt),
        bekreftetAlternativ: mote.bekreftetAlternativ ? Object.assign({}, mote.bekreftetAlternativ, {
            tid: lagJsDate(mote.bekreftetAlternativ.tid),
            created: lagJsDate(mote.bekreftetAlternativ.created),
        }) : null,
        bekreftetTidspunkt: mote.bekreftetTidspunkt ? lagJsDate(mote.bekreftetTidspunkt) : null,
        deltakere: mote.deltakere.map((deltaker) => {
            return Object.assign({}, deltaker, {
                svartidspunkt: lagJsDate(deltaker.svartidspunkt),
                svar: deltaker.svar.map((s) => {
                    return Object.assign({}, s, {
                        tid: lagJsDate(s.tid),
                        created: lagJsDate(s.created),
                    });
                }),
            });
        }),
        alternativer: mote.alternativer.map((alt) => {
            return Object.assign({}, alt, {
                tid: lagJsDate(alt.tid),
                created: lagJsDate(alt.created),
            });
        }),
    });
};
