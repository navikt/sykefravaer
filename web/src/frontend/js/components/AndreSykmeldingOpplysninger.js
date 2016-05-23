import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const AndreSykmeldingOpplysninger = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.sykmelderTlf || sykmelding.utstedelsesdato;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
            <h4 className="sykmelding-seksjonstittel">Annet</h4>
            {
                getSykmeldingOpplysning(sykmelding, 'sykmelderTlf', getLedetekst('sykmelding.vis.annet.tittel', ledetekster))
            }
            {
                getSykmeldingOpplysning(sykmelding, 'utstedelsesdato', getLedetekst('sykmelding.vis.annet.utstedelsesdato', ledetekster), formatDate(sykmelding.utstedelsesdato))
            }
    </div>);
};

AndreSykmeldingOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default AndreSykmeldingOpplysninger;
