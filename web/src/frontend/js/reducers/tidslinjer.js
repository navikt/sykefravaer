import { bilder } from '../tidslinjeData';

const initiellState = {
    henter: false,
    hentingFeilet: false,
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
        return a.antallDager > b.antallDager ? 1 : -1;
    });
};

export const leggTilBilder = (_tidslinjer) => {
    return _tidslinjer.map((tidslinje) => {
        const hendelser = tidslinje.hendelser.map((hendelse) => {
            if (bilder[hendelse.tekstkey]) {
                return Object.assign({}, hendelse, {
                    bilde: bilder[hendelse.tekstkey],
                });
            }
            return hendelse;
        });
        return Object.assign({}, tidslinje, { hendelser });
    });
};

export const leggTilTidshendelser = (_tidslinjer, arbeidssituasjon) => {
    let uker = [4, 7, 8, 26, 39];
    if (arbeidssituasjon === 'UTEN_ARBEIDSGIVER') {
        uker = [8, 12, 39];
    }
    const tidshendelser = uker.map((uke) => {
        return {
            antallDager: (uke * 7),
            type: 'TID',
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
                type: 'TITTEL',
            });
        }
        return Object.assign({}, tidslinje, { hendelser });
    });
};

export default function tidslinjer(state = initiellState, action) {
    switch (action.type) {
        case 'HENT_TIDSLINJER_FEILET': {
            return Object.assign({}, state, {
                data: [],
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_TIDSLINJER': {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'SET_TIDSLINJER': {
            const data = leggTilBilder(settHendelseIder(leggTilTidshendelser(action.tidslinjer, action.arbeidssituasjon)));
            return {
                henter: false,
                hentingFeilet: false,
                data,
            };
        }
        case 'ÅPNE_HENDELSER': {
            if (!state.data.length) {
                return state;
            }
            const data = state.data.map((tidslinje) => {
                return Object.assign({}, tidslinje, {
                    hendelser: tidslinje.hendelser.map((hendelse) => {
                        let obj = hendelse;
                        if (action.hendelseIder.indexOf(hendelse.id) !== -1) {
                            obj = Object.assign({}, hendelse, {
                                erApen: true,
                                visBudskap: true,
                                hoyde: 'auto',
                            });
                        }
                        return obj;
                    }),
                });
            });
            return Object.assign({}, state, { data });
        }
        case 'SET_HENDELSEDATA': {
            if (!state.data.length) {
                return state;
            }
            const data = state.data.map((tidslinje) => {
                return Object.assign({}, tidslinje, {
                    hendelser: tidslinje.hendelser.map((hendelse) => {
                        let obj = hendelse;
                        if (action.hendelseId === hendelse.id) {
                            obj = Object.assign({}, hendelse, action.data);
                        }
                        return obj;
                    }),
                });
            });
            return Object.assign({}, state, { data });
        }
        case 'BRUKER_ER_UTLOGGET': {
            return {
                data: [],
                hentingFeilet: false,
                henter: false,
            };
        }
        default: {
            return state;
        }
    }
}
