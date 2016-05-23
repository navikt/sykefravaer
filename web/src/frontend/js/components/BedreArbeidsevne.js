import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const BedreArbeidsevne = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.tilretteleggingArbeidsplass || sykmelding.tiltakNAV || sykmelding.tiltakAndre;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
            <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.arbeidsevne.tittel', ledetekster)}</h4>
            {
                getSykmeldingOpplysning(sykmelding, 'tilretteleggingArbeidsplass', getLedetekst('sykmelding.vis.arbeidsevne.tilrettelegging', ledetekster))
            }
            {
                getSykmeldingOpplysning(sykmelding, 'tiltakNAV', getLedetekst('sykmelding.vis.arbeidsevne.tiltaknav', ledetekster))
            }
            {
                getSykmeldingOpplysning(sykmelding, 'tiltakAndre', getLedetekst('sykmelding.vis.arbeidsevne.tiltakandre', ledetekster))
            }
    </div>);
};

BedreArbeidsevne.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default BedreArbeidsevne;
