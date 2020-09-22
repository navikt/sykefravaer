import { post } from '../gateway-api';

export const CountClickActionTypes = {
    JA_KLIKK: 'motebehov_ja',
    NEI_KLIKK: 'motebehov_nei',
};

function* countClickAction(value) {
    let key = '';
    switch (value) {
        case CountClickActionTypes.JA_KLIKK:
            key = CountClickActionTypes.JA_KLIKK;
            break;
        case CountClickActionTypes.NEI_KLIKK:
            key = CountClickActionTypes.NEI_KLIKK;
            break;
        default: key = '';
    }
    yield (post(`/sykefravaer/metrics/actions/links/${key}`, {}));
}

export function* countClickAktivitetsplan(antallSykedager) {
    yield (post(`/sykefravaer/metrics/actions/aktivitetsplan/${antallSykedager}`), {});
}

export default countClickAction;
