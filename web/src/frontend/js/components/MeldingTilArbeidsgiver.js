import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const MeldingTilArbeidsgiver = ({ sykmelding, ledetekster }) => {
	return (<div>
                {
                    sykmelding.innspillTilArbeidsgiver ? <h4 className="sykmelding-seksjonstittel">Melding til arbeidsgiver</h4> : ''
                }
                {
                    getSykmeldingOpplysning(sykmelding, "innspillTilArbeidsgiver", "Innspill til arbeidsgiver")
                }
		</div>);
};

export default MeldingTilArbeidsgiver;
