import { formaterEnkeltverdi } from '../../components/soknad-felles-sporsmal/fieldUtils';
import { genererValidateForDato } from '../../components/skjema/datovelger/Datovelger';

export const getOnChange = (props) => {
    if (props.pavirkerAndreSporsmal) {
        return (event, newValue) => {
            props.actions.soknadEndret(props.soknad, props.name, newValue);
        };
    }
    return null;
};

export const getOnChangeForDato = (props) => {
    if (props.pavirkerAndreSporsmal) {
        return (event, newValue) => {
            const verdi = formaterEnkeltverdi(newValue);
            const validate = genererValidateForDato({
                ...props,
                tidligsteFom: props.min,
                senesteTom: props.max,
            });
            console.log('Validerer', validate(verdi));
            if (validate(verdi) === undefined) {
                getOnChange(props)(event, newValue);
            }
        };
    }
    return null;
};
