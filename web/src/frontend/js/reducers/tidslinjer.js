import { bilder } from '../tidslinjeData';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

const settErApen = (hendelse, id, erApen) => {
    return Object.assign({}, hendelse, {
        erApen: `${hendelse.id}''` === `${id}''` ? erApen : hendelse.erApen === true,
    });
};

export const settHendelseIder = (_tidslinjer) => {
    return _tidslinjer.map((tidslinje, tidslinjeIndex) => {
        const hendelser = tidslinje.hendelser.map((hendelse, hendelseIndex) => {
            return Object.assign({}, hendelse, {
                id: `${tidslinjeIndex}${hendelseIndex}`,
            });
        });
        return Object.assign({}, tidslinje, {
            hendelser,
        });
    });
};

export const sorterHendelser = (hendelser) => {
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
            hendelser[0].tekstkey = 'tidslinje.sykefravaeret-starter';
            hendelser[0].type = 'TITTEL';
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
            return {
                henter: false,
                hentingFeilet: false,
                data: leggTilBilder(settHendelseIder(leggTilTidshendelser(action.tidslinjer, action.arbeidssituasjon))),
            };
        }
        case 'ÅPNE_HENDELSER': {
            const data = state.data;
            if (!data.length) {
                return state;
            }
            let hendelser = data[0].hendelser;
            action.hendelseIder.forEach((id) => {
                hendelser = hendelser.map((hendelse) => {
                    const obj = settErApen(hendelse, id, true);
                    if (obj.erApen) {
                        obj.visBudskap = true;
                        obj.hoyde = 'auto';
                    }
                    return obj;
                });
            });
            data[0].hendelser = hendelser;
            return Object.assign({}, state, { data });
        }
        case 'SET_HENDELSEDATA': {
            const data = state.data;
            data[0].hendelser = data[0].hendelser.map((hendelse) => {
                let ret = hendelse;
                if (hendelse.id === action.hendelseId) {
                    ret = Object.assign({}, hendelse, action.data);
                }
                return ret;
            });
            return Object.assign({}, state, { data });
        }
        default: {
            return state;
        }
    }
}
