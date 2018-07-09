import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';

const UtgaattSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <Alertstripe type="info" className="blokk">
            <p className="sist">{getLedetekst('sykepengesoknad.utgaatt.info.tekst')}</p>
        </Alertstripe>
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

UtgaattSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
