import setup from './sykepengesoknadSelvstendigSetup';
import Kvittering from '../../components/sykepengesoknad-selvstendig/Kvittering/Kvittering';

const validate = () => {
    return {};
};

export default setup(validate, Kvittering, false);
