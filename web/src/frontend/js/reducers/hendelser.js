const settErApen = (hendelse, id, erApen) => {
    return Object.assign({}, hendelse, {
        erApen: `${hendelse.id}''` === `${id}''` ? erApen : hendelse.erApen === true,
    });
};

const initiellState = {
    data: [],
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
        case 'HENTER_HENDELSER': {
            return {
                data: [],
                hentingFeilet: false,
                henter: true,
            };
        }
        case 'HENT_HENDELSER_FEILET': {
            return {
                data: [],
                hentingFeilet: true,
                henter: false,
            };
        }
        default: {
            return state;
        }
    }
}
