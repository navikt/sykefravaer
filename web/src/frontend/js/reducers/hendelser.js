import { getDuration } from '../utils/datoUtils';

const initiellState = {
    data: [],
};

const settErApen = (hendelse, id, erApen) => {
    return Object.assign({}, hendelse, {
        erApen: `${hendelse.id}''` === `${id}''` ? erApen : hendelse.erApen === true,
    });
};

export default function hendelser(state = initiellState, action) {
    switch (action.type) {
        case 'SET_HENDELSER': {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case 'ÅPNE_HENDELSER': {
            let data = state.data;
            action.hendelseIder.forEach((id) => {
                data = data.map((hendelse) => {
                    const obj = settErApen(hendelse, id, true);
                    if (obj.erApen) {
                        obj.visBudskap = true;
                        obj.hoyde = 'auto';
                    }
                    return obj;
                });
            });
            const ret = Object.assign({}, state, { data });
            return ret;
        }
        case 'LEGG_TIL_HENDELSER': {
            const _berik = action.sykeforloep.hendelser.map((hendelse, index) => {
                let data = {};
                let dagerEtterStart = -1;
                const visning = ['MED_ARBEIDSGIVER', 'UTEN_ARBEIDSGIVER'];
                let ledetekst = '';
                let bilde = '';
                switch (hendelse.type) {
                    case 'SYKETILFELLE_START': {
                        data = { oppfoelgingsdato: hendelse.inntruffetdato };
                        ledetekst = 'tidslinje.forste-sykmeldingsdag';
                        break;
                    }
                    default: {
                        dagerEtterStart = getDuration(action.sykeforloep.oppfoelgingsdato, hendelse.inntruffetdato) - 1;
                        ledetekst = 'tidslinje.aktivitetskrav.varsel';
                        data = { hendelseDato: hendelse.inntruffetdato };
                        bilde = '/sykefravaer/img/tidslinje/aktivitetskrav';
                        break;
                    }
                }
                return Object.assign({}, hendelse, {
                    id: `d${index}`,
                    dagerEtterStart,
                    data,
                    visning,
                    ledetekst,
                    bilde,
                });
            });

            const _hendelser = state.data.concat(_berik);

            return Object.assign({}, state, { data: _hendelser });
        }
        case 'SET_HENDELSEDATA': {
            const data = state.data.map((hendelse) => {
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
