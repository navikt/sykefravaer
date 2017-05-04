import * as actiontyper from '../actions/actiontyper';
import { tilDato, parseDatoerPeriodeListe, parseDatoerPeriode } from '../utils/serialisering/dato';
import { SENDT } from '../enums/sykepengesoknadstatuser';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    data: [],
};

export function sorterAktiviteterEldsteFoerst(soknad) {
    const aktiviteter = soknad.aktiviteter.sort((a, b) => {
        if (a.periode.fom.getTime() !== b.periode.fom.getTime()) {
            return a.periode.fom - b.periode.fom;
        }
        return a.periode.tom - b.periode.tom;
    });
    return Object.assign({}, soknad, {
        aktiviteter,
    });
}

const setSykepengesoknaderProps = (_sykepengesoknader, soknadsId, props) => {
    return _sykepengesoknader.map((soknad) => {
        let _soknad = Object.assign({}, soknad);
        if (_soknad.id === soknadsId) {
            _soknad = Object.assign({}, _soknad, props);
        }
        return _soknad;
    });
};

const parseAktivitetsdatoer = (aktiviteter) => {
    return aktiviteter.map((aktivitet) => {
        return Object.assign({}, aktivitet,
            {
                periode: parseDatoerPeriode(aktivitet.periode),
            }
        );
    });
};

const parseUtdanningsDato = (utdanning) => {
    return utdanning && Object.assign({}, utdanning, { utdanningStartdato: tilDato(utdanning.utdanningStartdato) });
};

const parseUtenlandsopphold = (utenlandsopphold) => {
    return utenlandsopphold && Object.assign({}, utenlandsopphold, { perioder: parseDatoerPeriodeListe(utenlandsopphold.perioder) });
};

const setArbeidsgiverForskutterer = (sykepengesoknad) => {
    if (sykepengesoknad.arbeidsgiverForskutterer === undefined) {
        return sykepengesoknad;
    }
    const arbeidsgiverForskutterer = ((s) => {
        if (s.arbeidsgiverForskutterer) {
            return 'JA';
        }
        if (s.arbeidsgiverForskutterer === false) {
            return 'NEI';
        }
        return null;
    })(sykepengesoknad);
    return Object.assign({}, sykepengesoknad, {
        arbeidsgiverForskutterer,
    });
};

export const parseDatofelter = (soknad) => {
    const _soknad = Object.assign({}, soknad);
    _soknad.aktiviteter = parseAktivitetsdatoer(soknad.aktiviteter);
    _soknad.egenmeldingsperioder = soknad.egenmeldingsperioder && parseDatoerPeriodeListe(soknad.egenmeldingsperioder);
    _soknad.ferie = soknad.ferie && parseDatoerPeriodeListe(soknad.ferie);
    _soknad.permisjon = soknad.permisjon && parseDatoerPeriodeListe(soknad.permisjon);
    _soknad.utenlandsopphold = parseUtenlandsopphold(soknad.utenlandsopphold);
    _soknad.utdanning = parseUtdanningsDato(soknad.utdanning);
    _soknad.gjenopptattArbeidFulltUtDato = tilDato(soknad.gjenopptattArbeidFulltUtDato);
    _soknad.identdato = tilDato(soknad.identdato);
    _soknad.innsendtDato = tilDato(soknad.innsendtDato);
    _soknad.opprettetDato = tilDato(soknad.opprettetDato);
    _soknad.sykmeldingSkrevetDato = tilDato(soknad.sykmeldingSkrevetDato);
    return _soknad;
};

export default function sykepengesoknader(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SYKEPENGESOKNADER_HENTET: {
            const soknader = action.sykepengesoknader.map((s) => {
                let soknad = parseDatofelter(s);
                soknad = setArbeidsgiverForskutterer(soknad);
                return sorterAktiviteterEldsteFoerst(soknad);
            });
            return Object.assign({}, state, {
                data: soknader,
                henter: false,
                hentingFeilet: false,
            });
        }
        case actiontyper.HENTER_SYKEPENGESOKNADER: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontyper.HENT_SYKEPENGESOKNADER_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontyper.SENDER_SYKEPENGESOKNAD: {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
            });
        }
        case actiontyper.SEND_SYKEPENGESOKNAD_FEILET: {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
            });
        }
        case actiontyper.SYKEPENGESOKNAD_SENDT: {
            let data;
            // GAMMELT RESTSVAR
            if (action.sykepengesoknad && action.sykepengesoknad.id) {
                data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, Object.assign({}, setArbeidsgiverForskutterer(action.sykepengesoknad)));
            } else {
                data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, {
                    status: SENDT,
                    innsendtDato: new Date(),
                });
            }
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        default:
            return state;
    }
}
