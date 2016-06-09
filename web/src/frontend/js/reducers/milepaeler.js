const settErApen = (milepael, id, erApen) => {
    return Object.assign({}, milepael, {
        erApen: `${milepael.id}''` === `${id}''` ? erApen : milepael.erApen === true,
    });
};

export default function milepaeler(state = {}, action) {
    switch (action.type) {
        case 'SET_MILEPÆLER': {
            return {
                data: action.data,
            };
        }
        case 'ÅPNE_MILEPÆLER': {
            let data = state.data;
            action.milepaelIder.forEach((id) => {
                data = data.map((milepael) => {
                    const obj = settErApen(milepael, id, true);
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
        case 'SET_MILEPÆLDATA': {
            const data = state.data.map((milepael) => {
                let ret = milepael;
                if (milepael.id === action.milepaelId) {
                    ret = Object.assign({}, milepael, action.data);
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
