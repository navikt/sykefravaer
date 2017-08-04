import React from 'react';
import { Hjelpetekst, getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import * as proptypes from '../../propTypes';
import Sidetopp from '../Sidetopp';

const SykepengesoknadHeader = ({ sykepengesoknad }) => {
    if (false) {
        return <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />;
    }
    return (<header className="sidetopp">
        <h1 className="sidetopp__tittel">{getLedetekst('sykepengesoknad.sidetittel')}</h1>
        <div className="medHjelpetekst sidetopp__meta">
            <p>{
                getLedetekst('sykepengesoknad.sidetittel.periode', {
                    '%FOM%': toDatePrettyPrint(sykepengesoknad.fom),
                    '%TOM%': toDatePrettyPrint(sykepengesoknad.tom),
                })
            }</p>
            <Hjelpetekst
                tittel={getLedetekst('sykepengesoknad.sidetittel.hjelpetekst.tittel')}
                tekst={getLedetekst('sykepengesoknad.sidetittel.hjelpetekst.tekst')} />
        </div>
    </header>);
};

SykepengesoknadHeader.propTypes = {
    sykepengesoknad: proptypes.sykepengesoknad,
};

export default SykepengesoknadHeader;
