import validerSporsmal from '../../validering/validerSporsmal';
import { erSisteSide } from './ettSporsmalPerSideUtils';
import { hentSporsmalForOppsummering } from './ettSporsmalPerSideUtils';

export const validerDenneSiden = (values, props) => {
    const sporsmal = erSisteSide(props.soknad, props.sidenummer)
        ? hentSporsmalForOppsummering(props.soknad)
        : [props.soknad.sporsmal[props.sidenummer - 1]];
    const resultat = validerSporsmal(sporsmal, values);
    return resultat;
};

export const validerForegaendeSider = (values, props) => {
    const sporsmal = props.soknad.sporsmal.filter((spm, index) => {
        return (index + 1) < props.sidenummer;
    });
    return validerSporsmal(sporsmal, values);
};
