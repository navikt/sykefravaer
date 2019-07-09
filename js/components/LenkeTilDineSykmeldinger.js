import React from 'react';
import { Link } from 'react-router';
import { getLedetekst } from '@navikt/digisyfo-npm';

const LenkeTilDineSykmeldinger = () => {
    return (
        <p className="ikke-print blokk navigasjonsstripe">
            <Link to={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`} className="tilbakelenke">
                {getLedetekst('din-sykmelding.tilbake')}
            </Link>
        </p>
    );
};

export default LenkeTilDineSykmeldinger;
