import { formaterEnkeltverdi } from '../../components/soknad-felles-sporsmal/fieldUtils';
import { erGyldigDato } from '../datoUtils';

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
            const formatertVerdi = formaterEnkeltverdi(newValue);
            if (erGyldigDato(formatertVerdi)) {
                props.actions.soknadEndret(props.soknad, props.name, newValue);
            }
        };
    }
    return null;
};
