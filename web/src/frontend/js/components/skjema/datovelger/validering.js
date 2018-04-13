import { toDatePrettyPrint, fraInputdatoTilJSDato, erGyldigDatoformat } from 'digisyfo-npm';
import { erGyldigDato } from '../../../utils/datoUtils';

export const validerPeriode = (input, alternativer) => {
    const { fra, til } = alternativer;
    const inputDato = fraInputdatoTilJSDato(input);
    if (fra && til && (inputDato < fra || inputDato > til)) {
        return `Datoen må være innenfor perioden ${toDatePrettyPrint(fra)}-${toDatePrettyPrint(til)}`;
    }
    if (til && inputDato > til) {
        return `Datoen må være før ${toDatePrettyPrint(til)}`;
    }
    if (fra && inputDato < fra) {
        return `Datoen må være etter ${toDatePrettyPrint(fra)}`;
    }
    return undefined;
};

export const validerDatoField = (input, alternativer) => {
    if (!input) {
        return 'Vennligst fyll ut dato';
    } else if (!erGyldigDatoformat(input)) {
        return 'Datoen må være på formatet dd.mm.åååå';
    } else if (!erGyldigDato(input)) {
        return 'Datoen er ikke gyldig';
    } else if (alternativer && (alternativer.fra || alternativer.til)) {
        return validerPeriode(input, alternativer);
    }
    return undefined;
};
