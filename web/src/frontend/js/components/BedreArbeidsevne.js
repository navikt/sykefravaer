import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const BedreArbeidsevne = ({ sykmelding, ledetekster }) => {
    const visSeksjon = sykmelding.tilretteleggingArbeidsplass || sykmelding.tiltakNAV || sykmelding.tiltakAndre;
    if(!visSeksjon) {
        return <span />;
    }
	return (<div className="sykmelding-seksjon">
            <h4 className="sykmelding-seksjonstittel">Hva skal til for å bedre arbeidsevnen?</h4>
            {
                getSykmeldingOpplysning(sykmelding, "tilretteleggingArbeidsplass", "Tilrettelegging/hensyn som bør tas på arbeidsplassen")
            }
            {
                getSykmeldingOpplysning(sykmelding, "tiltakNAV", "Tiltak i regi av/innspill til NAV")
            }
            {
                getSykmeldingOpplysning(sykmelding, "tiltakAndre", "Eventuelle andre tiltak/innspill")
            }
	</div>);
};

export default BedreArbeidsevne;
