import React from 'react';
import { Link } from 'react-router';
import { getLedetekst } from 'digisyfo-npm';

const LenkeTilDineSykmeldinger = () => {
    return (<p className="ikke-print blokk navigasjonsstripe">
        <Link to="/sykefravaer/sykmeldinger" className="tilbakelenke">
            {getLedetekst('din-sykmelding.tilbake')}
        </Link>
    </p>);
};

export default LenkeTilDineSykmeldinger;
