const settErApen = (hendelse, id, erApen) => {
    return Object.assign({}, hendelse, {
        erApen: `${hendelse.id}''` === `${id}''` ? erApen : hendelse.erApen === true,
    });
};

export default function hendelser(state = {}, action) {
    switch (action.type) {
        case 'SET_HENDELSER': {
            return {
                data: action.data,
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
        default: {
            return state;
        }
    }
}
