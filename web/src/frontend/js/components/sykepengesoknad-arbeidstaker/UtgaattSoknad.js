import React from 'react';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';

const UtgaattSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <div className="panel panel--komprimert">
            <Varselstripe type="info" fylt>
                <p className="sist">{getLedetekst('sykepengesoknad.utgaatt.info.tekst')}</p>
            </Varselstripe>
        </div>
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

UtgaattSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
