import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from 'digisyfo-npm';

const LenkeTilDineSykmeldinger = ({ ledetekster }) => {
    return (<p className="ikke-print blokk navigasjonsstripe">
        <Link to="/sykefravaer/sykmeldinger">
            {getLedetekst('din-sykmelding.tilbake', ledetekster)}
        </Link>
    </p>);
};

LenkeTilDineSykmeldinger.propTypes = {
    ledetekster: PropTypes.object,
};

export default LenkeTilDineSykmeldinger;
