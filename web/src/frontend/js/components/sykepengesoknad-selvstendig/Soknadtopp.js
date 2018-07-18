import React from 'react';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { soknad as soknadPt } from '../../propTypes';

const Soknadtopp = ({ soknad }) => {
    return (<header className="sidetopp">
        <h1 className="sidetopp__tittel">{getLedetekst('sykepengesoknad.sidetittel')}</h1>
        <div className="sidetopp__meta">
            <p>
                {
                    getLedetekst('sykepengesoknad.sidetittel.periode', {
                        '%FOM%': toDatePrettyPrint(soknad.fom),
                        '%TOM%': toDatePrettyPrint(soknad.tom),
                    })
                }
            </p>
        </div>
    </header>);
};

Soknadtopp.propTypes = {
    soknad: soknadPt,
};

export default Soknadtopp;
