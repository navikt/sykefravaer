import * as actiontyper from '../actions/actiontyper';
import { tilDato, parseDatoerPeriodeListe, parseDatoerPeriode } from '../utils/serialisering/dato';
import { SENDT } from '../statuser/sykepengesoknadstatuser';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    data: [],
};

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
                return parseDatofelter(s);
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
                data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, action.sykepengesoknad);
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
