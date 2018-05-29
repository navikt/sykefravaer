import setup from './sykepengesoknadSelvstendigSetup';
import AktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-selvstendig/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import validerAktiviteterISykmeldingsperioden from '../../components/sykepengesoknad-selvstendig/validering/validerAktiviteterISykmeldingsperioden';

export default setup(validerAktiviteterISykmeldingsperioden, AktiviteterISykmeldingsperioden, false);
