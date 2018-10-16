import validerSporsmal from '../../../utils/soknad-felles/validerSporsmal';
import { hentSporsmalForOppsummering } from '../Oppsummering/Oppsummering';
import validerAktiviteterISykmeldingsperioden from './validerAktiviteterISykmeldingsperioden';

export default (values, props) => {
    const sporsmal = hentSporsmalForOppsummering(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const feilmeldingerForrigeSide = validerAktiviteterISykmeldingsperioden(values, props);
    return {
        ...feilmeldinger, ...feilmeldingerForrigeSide,
    };
};
