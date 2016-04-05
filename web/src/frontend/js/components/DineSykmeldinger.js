import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';

const DineSykmeldinger = ({ sykmeldinger = [] }) => {
	return (<div>
				<h1 className="side-header typo-sidetittel">
					{getLedetekst('dine-sykmeldinger.tittel')}
				</h1>
				<div className="panel panel-transparent panel-stablet typo-infotekst">
					<p>{getLedetekst('dine-sykmeldinger.introduksjonstekst')}</p>
				</div>
				<SykmeldingTeasere
					sykmeldinger={sykmeldinger} 
					tittel="Aktive sykmeldinger"
					ingenSykmeldingerMelding="Du har ingen aktive sykmeldinger."
					className="js-nye-sykmeldinger" />
				<SykmeldingTeasere
					sykmeldinger={sykmeldinger} 
					tittel="Tidligere sykmeldinger"
					ingenSykmeldingerMelding="Du har ingen tidligere sykmeldinger."
					className="js-tidligere-sykmeldinger" />
				<div className="panel">
					<h2 className="typo-innholdstittel blokk-s">
						{getLedetekst('dine-sykmeldinger.informasjon.tittel')}
					</h2>
					<div className="redaksjonelt-innhold typo-infotekst"
						dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.informasjon.tekst')}>
					</div>
				</div>
			</div>);
};

DineSykmeldinger.propTypes = {
	sykmeldinger: PropTypes.array.isRequired,
};

export default DineSykmeldinger;
