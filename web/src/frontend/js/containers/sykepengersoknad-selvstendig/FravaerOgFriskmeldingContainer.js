import setup from './sykepengesoknadSelvstendigSetup';
import FravaerOgFriskmelding from '../../components/sykepengesoknad-selvstendig/FravaerOgFriskmelding/FravaerOgFriskmelding';
import validerFravaerOgFriskmelding from '../../components/sykepengesoknad-selvstendig/validering/validerFravaerOgFriskmelding';

export default setup(validerFravaerOgFriskmelding, FravaerOgFriskmelding, false);
