import React, { PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const UtgaattSoknad = ({ ledetekster, sykepengesoknad }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel', ledetekster)} />
        <div className="panel panel--komprimert">
            <Varselstripe type="info" fylt>
                <p className="sist">{getLedetekst('sykepengesoknad.utgaatt.info.tekst')}</p>
            </Varselstripe>
        </div>
        <SykmeldingUtdrag ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

UtgaattSoknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
