import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const AndreSykmeldingOpplysninger = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.bekreftelse.sykmelderTlf || sykmelding.bekreftelse.utstedelsesdato;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
            <h4 className="sykmelding-seksjonstittel">Annet</h4>
            {
                getSykmeldingOpplysning(sykmelding.bekreftelse, 'sykmelderTlf', getLedetekst('sykmelding.vis.annet.telefon', ledetekster))
            }
    </div>);
};

AndreSykmeldingOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default AndreSykmeldingOpplysninger;
