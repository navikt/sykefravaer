import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const MeldingTilArbeidsgiver = ({ sykmelding, ledetekster }) => {
	const visSeksjon = sykmelding.innspillTilArbeidsgiver;
	if (!visSeksjon) {
		return <span />
	}
	return (<div className="sykmelding-seksjon">
            <h4 className="sykmelding-seksjonstittel">Melding til arbeidsgiver</h4>
            {
                getSykmeldingOpplysning(sykmelding, "innspillTilArbeidsgiver", "Innspill til arbeidsgiver")
            }
	</div>);
};

export default MeldingTilArbeidsgiver;
