import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from '../ledetekster';

const LenkeTilDineSykmeldinger = ({ ledetekster }) => {
    return (<p className="side-innhold ikke-print blokk navigasjonsstripe">
        <Link to="/sykefravaer/sykmeldinger">
            {getLedetekst('din-sykmelding.tilbake', ledetekster)}
        </Link>
    </p>);
};

LenkeTilDineSykmeldinger.propTypes = {
    ledetekster: PropTypes.object,
};

export default LenkeTilDineSykmeldinger;
