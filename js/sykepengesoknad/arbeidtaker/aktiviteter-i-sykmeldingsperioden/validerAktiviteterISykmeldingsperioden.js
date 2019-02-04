import { hentSporsmalForAktiviteterISykmeldingsperioden } from './AktiviteterISykmeldingsperioden';
import validerSporsmal from '../../../validering/validerSporsmal';
import validerFravaerOgFriskmelding from '../fravar-og-friskmelding/validerFravaerOgFriskmelding';

export default (values, props) => {
    const sporsmal = hentSporsmalForAktiviteterISykmeldingsperioden(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const feilmeldingerForrigeSide = validerFravaerOgFriskmelding(values, props);
    return {
        ...feilmeldinger,
        ...feilmeldingerForrigeSide,
    };
};
