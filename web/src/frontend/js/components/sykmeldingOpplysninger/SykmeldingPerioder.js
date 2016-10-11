import React, { PropTypes } from 'react';
import SykmeldingPeriode from './SykmeldingPeriode';
import { getDuration, sorterPerioderEldsteFoerst } from '../../utils';

const SykmeldingPerioder = ({ perioder = [], ledetekster, Overskrift = 'H3' }) => {
    return (<div className="sykmeldingPerioder">
        {
            sorterPerioderEldsteFoerst(perioder).map((periode, index) => {
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
