import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import { getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const BedreArbeidsevne = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.arbeidsevne.tilretteleggingArbeidsplass || sykmelding.arbeidsevne.tiltakNAV || sykmelding.arbeidsevne.tiltakAndre;
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
            <h4 className="sykmelding-seksjonstittel">{getLedetekst('din-sykmelding.arbeidsevne.tittel', ledetekster)}</h4>
            {
                getSykmeldingOpplysning(sykmelding.arbeidsevne, 'tilretteleggingArbeidsplass', getLedetekst('din-sykmelding.arbeidsevne.tilrettelegging', ledetekster))
            }
            {
                getSykmeldingOpplysning(sykmelding.arbeidsevne, 'tiltakNAV', getLedetekst('din-sykmelding.arbeidsevne.tiltaknav', ledetekster))
            }
            {
                getSykmeldingOpplysning(sykmelding.arbeidsevne, 'tiltakAndre', getLedetekst('din-sykmelding.arbeidsevne.tiltakandre', ledetekster))
            }
    </div>);
};

BedreArbeidsevne.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default BedreArbeidsevne;
