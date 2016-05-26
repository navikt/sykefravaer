import React, { PropTypes } from 'react';
import SykmeldingPeriode from './SykmeldingPeriode.js';
import { getDuration } from '../utils/index.js';

const SykmeldingPerioder = ({ perioder = [], ledetekster, Overskrift = 'H3' }) => {
    return (<div className="sykmelding-perioder">
        {
            perioder.map((periode, index) => {
                return (<SykmeldingPeriode
                    key={index}
                    periode={periode}
                    antallDager={getDuration(periode.fom, periode.tom)}
                    ledetekster={ledetekster}
                    Overskrift={Overskrift} />);
            })
        }
    </div>);
};

SykmeldingPerioder.propTypes = {
    perioder: PropTypes.array.isRequired,
    ledetekster: PropTypes.object,
    Overskrift: PropTypes.string,
};

export default SykmeldingPerioder;
