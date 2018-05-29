import setup from './sykepengesoknadSelvstendigSetup';
import validate from '../../components/sykepengesoknad-selvstendig/validering/validerFoerDuBegynner';
import FoerDuBegynner from '../../components/sykepengesoknad-selvstendig/FoerDuBegynner/FoerDuBegynner';

export default setup(validate, FoerDuBegynner, true);
