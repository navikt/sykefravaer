import { erGyldigDatoformat } from '@navikt/digisyfo-npm';
import { erGyldigDato } from '../../../utils/datoUtils';
import validerPeriode from '../periodevelger/validerPeriode';

const validerDatoField = (input, alternativer) => {
    if (!input) {
        return 'Vennligst fyll ut dato';
    } if (!erGyldigDatoformat(input)) {
        return 'Datoen må være på formatet dd.mm.åååå';
    } if (!erGyldigDato(input)) {
        return 'Datoen er ikke gyldig';
    } if (alternativer && (alternativer.fra || alternativer.til)) {
        return validerPeriode(input, alternativer);
    }
    return undefined;
};

export default validerDatoField;
