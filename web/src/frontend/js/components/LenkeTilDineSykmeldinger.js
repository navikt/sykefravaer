import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst } from '../ledetekster';

const LenkeTilDineSykmeldinger = ({ ledetekster }) => {
    return (<p className="side-innhold ikke-print">
        <Link to="/sykefravaer/sykmeldinger">
            &lsaquo; {getLedetekst('din-sykmelding.tilbake', ledetekster)}
        </Link>
    </p>);
};

LenkeTilDineSykmeldinger.propTypes = {
    ledetekster: PropTypes.object,
};

export default LenkeTilDineSykmeldinger;
