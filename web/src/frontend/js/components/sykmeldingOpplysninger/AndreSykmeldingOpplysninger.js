import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import { getSykmeldingOpplysning } from '../../utils/dinSykmeldingUtils';

const AndreSykmeldingOpplysninger = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.bekreftelse.sykmelderTlf || sykmelding.bekreftelse.utstedelsesdato;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmeldingSeksjon">
            <h4 className="sykmeldingSeksjon__tittel">Annet</h4>
            {
                getSykmeldingOpplysning(sykmelding.bekreftelse, 'sykmelderTlf', getLedetekst('din-sykmelding.annet.telefon', ledetekster))
            }
    </div>);
};

AndreSykmeldingOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default AndreSykmeldingOpplysninger;
