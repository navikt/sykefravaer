import React, { PropTypes } from 'react';
import SykmeldingPeriode from './SykmeldingPeriode.js';
import { getDuration } from '../utils/index.js';

const SykmeldingPerioder = ({ perioder = [], ledetekster }) => {
    return (<div className="sykmelding-perioder">
        {
            perioder.map((periode, index) => {
                return (<SykmeldingPeriode key={index} periode={periode} antallDager={getDuration(periode.fom, periode.tom)} ledetekster={ledetekster} />);
            })
        }
    </div>);
};

SykmeldingPerioder.propTypes = {
    perioder: PropTypes.array.isRequired,
    ledetekster: PropTypes.object,
};

export default SykmeldingPerioder;
