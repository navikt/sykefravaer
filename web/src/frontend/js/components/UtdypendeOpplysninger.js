import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const UtdypendeOpplysninger = ({ sykmelding, ledetekster }) => {
	return (<div>
                {
                    sykmelding.sykehistorie || sykmelding.paavirkningArbeidsevne || sykmelding.resultatAvBehandling || sykmelding.henvisningUtredningBehandling ? <h4 className="sykmelding-seksjonstittel">Utdypende opplysninger</h4> : ''
                }
                {
                    getSykmeldingOpplysning(sykmelding, "sykehistorie", "Beskriv kort sykehistorie, symptomer og funn i dagens situasjon")
                }
                {
                    getSykmeldingOpplysning(sykmelding, "paavirkningArbeidsevne", "Hvordan påvirker sykdommen arbeidsevnen?")
                }
                {
                    getSykmeldingOpplysning(sykmelding, "resultatAvBehandling", "Har behandlingen frem til nå bedret arbeidsevnen?")
                }
                {
                    getSykmeldingOpplysning(sykmelding, "henvisningUtredningBehandling", "Beskriv pågående og planlagt henvisning, utredning og/eller behandling")
                }
		</div>);
};

export default UtdypendeOpplysninger;
