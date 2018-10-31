import { hentSporsmalForOppsummering } from '../Oppsummering/Oppsummering';
import validerSporsmal from '../../../validering/validerSporsmal';
import validerAktiviteterISykmeldingsperioden from './validerAktiviteterISykmeldingsperioden';

export default (values, props) => {
    const sporsmal = hentSporsmalForOppsummering(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const feilmeldingerForrigeSide = validerAktiviteterISykmeldingsperioden(values, props);
    return {
        ...feilmeldinger,
        ...feilmeldingerForrigeSide,
    };
};
