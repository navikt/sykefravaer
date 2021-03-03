import { bilder } from '../tidslinjeData';
import * as actiontyper from '../actions/actiontyper';
import {
    HENDELSE_TYPER,
    TIDSLINJE_TYPER,
    hentTidslinjerFraSykeforloep,
} from '../utils/tidslinjeUtils';

const initiellState = {
    data: [],
};

export const settHendelseIder = (_tidslinjer) => {
    return _tidslinjer.map((tidslinje, tidslinjeIndex) => {
        const hendelser = tidslinje.hendelser.map((hendelse, hendelseIndex) => {
            const hendelseId = hendelse.id ? hendelse.id : hendelseIndex;
            return Object.assign({}, hendelse, {
                id: `${tidslinjeIndex}${hendelseId}`,
            });
        });
        return Object.assign({}, tidslinje, {
            hendelser,
        });
    });
};

export const sorterHendelser = (_hendelser) => {
    const hendelser = [..._hendelser];
    return hendelser.sort((a, b) => {
        if (a.antallDager === b.antallDager) {
            return a.id > b.id ? 1 : -1;
        }
        return a.antallDager > b.antallDager ? 1 : -1;
    });
};

export const leggTilBilder = (_tidslinjer) => {
    return _tidslinjer.map((tidslinje) => {
        const hendelser = tidslinje.hendelser.map((hendelse) => {
            if (bilder[hendelse.tekstkey]) {
                return Object.assign({}, hendelse, {
                    bilde: `${process.env.REACT_APP_CONTEXT_ROOT}${bilder[hendelse.tekstkey]}`,
                });
            }
            return hendelse;
        });
        return Object.assign({}, tidslinje, { hendelser });
    });
};

export const leggTilTidshendelser = (_tidslinjer, arbeidssituasjon) => {
    let uker = [4, 7, 17, 26, 39];
    if (arbeidssituasjon === TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER) {
        uker = [8, 12, 39];
    }
    const tidshendelser = uker.map((uke) => {
        return {
            antallDager: (uke * 7),
            type: HENDELSE_TYPER.TID,
            tekstkey: `tidslinje.antall-uker.${uke}`,
        };
    });
    return _tidslinjer.map((tidslinje) => {
        let hendelser = tidslinje.hendelser.concat(tidshendelser);
        hendelser = sorterHendelser(hendelser);
        if (tidslinje.startdato) {
            hendelser[0].type = 'FØRSTE_SYKMELDINGSDAG';
            hendelser[0].tekstkey = 'tidslinje.forste-sykmeldingsdag';
            hendelser[0].data = {
                startdato: tidslinje.startdato,
            };
        } else {
            hendelser[0] = Object.assign({}, hendelser[0], {
                tekstkey: 'tidslinje.sykefravaeret-starter',
                type: HENDELSE_TYPER.TITTEL,
            });
        }
        return Object.assign({}, tidslinje, { hendelser });
    });
};


export default function tidslinjer(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SYKEFORLOEP_HENTET: {
            const arbeidssituasjon = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
            const tidslinjerFraSykeforloep = hentTidslinjerFraSykeforloep(action.data, arbeidssituasjon);
            const data = leggTilBilder(settHendelseIder(leggTilTidshendelser(tidslinjerFraSykeforloep, arbeidssituasjon)));
            return Object.assign({}, state, {
                data,
            });
        }
        case actiontyper.SET_TIDSLINJER: {
            const { arbeidssituasjon } = action;
            const tidslinjerFraSykeforloep = hentTidslinjerFraSykeforloep(action.sykeforloep, arbeidssituasjon);
            const data = leggTilBilder(settHendelseIder(leggTilTidshendelser(tidslinjerFraSykeforloep, arbeidssituasjon)));
            return Object.assign({}, state, {
                data,
            });
        }
        case actiontyper.APNE_HENDELSER: {
            if (!state.data.length) {
                return state;
            }
            const data = state.data.map((tidslinje) => {
                return Object.assign({}, tidslinje, {
                    hendelser: [...tidslinje.hendelser].map((hendelse) => {
                        if (action.hendelseIder.indexOf(hendelse.id) !== -1) {
                            return Object.assign({}, hendelse, {
                                erApen: true,
                                visBudskap: true,
                                hoyde: 'auto',
                            });
                        }
                        return hendelse;
                    }),
                });
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.SET_HENDELSEDATA: {
            if (!state.data.length) {
                return state;
            }
            const data = state.data.map((tidslinje) => {
                return Object.assign({}, tidslinje, {
                    hendelser: tidslinje.hendelser.map((hendelse) => {
                        if (action.hendelseId === hendelse.id) {
                            return Object.assign({}, hendelse, action.data);
                        }
                        return hendelse;
                    }),
                });
            });
            return Object.assign({}, state, { data });
        }
        default: {
            return state;
        }
    }
}
