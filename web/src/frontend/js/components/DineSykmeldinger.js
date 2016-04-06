import React, { PropTypes } from 'react';
import SykmeldingTeasere from '../components/SykmeldingTeasere.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
const moment = require("moment");

const DineSykmeldinger = ({ sykmeldinger = [] }) => {
	return (<div>
				<h1 className="side-header typo-sidetittel">
					{getLedetekst('dine-sykmeldinger.tittel')}
				</h1>
				<div className="panel panel-transparent panel-stablet redaksjonelt-innhold side-innhold">
					<p dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst')} />
				</div>
				<SykmeldingTeasere
					sykmeldinger={sykmeldinger.filter((sykmld) => {
						const fomDato = moment(sykmld.fom);
						const tomDato = moment(sykmld.tom);
						const dagensDato = moment(); 
						return dagensDato.isBetween(fomDato, tomDato);
					})}
					tittel="Aktive sykmeldinger"
					ingenSykmeldingerMelding="Du har ingen aktive sykmeldinger."
					className="js-nye-sykmeldinger" />
				<SykmeldingTeasere
					sykmeldinger={sykmeldinger.filter((sykmld) => {http://www.nav.no/
						const fomDato = moment(sykmld.fom);
						const tomDato = moment(sykmld.tom);
						const dagensDato = moment(); 
						return !dagensDato.isBetween(fomDato, tomDato);
					})} 
					tittel="Tidligere sykmeldinger"
					ingenSykmeldingerMelding="Du har ingen tidligere sykmeldinger."
					className="js-tidligere-sykmeldinger" />
				<div className="panel">
					<h2 className="typo-innholdstittel blokk-s">
						{getLedetekst('dine-sykmeldinger.informasjon.tittel')}
					</h2>
					<div className="redaksjonelt-innhold typo-infotekst side-innhold"
						dangerouslySetInnerHTML={getHtmlLedetekst('dine-sykmeldinger.informasjon.tekst')}>
					</div>
				</div>
			</div>);
};

DineSykmeldinger.propTypes = {
	sykmeldinger: PropTypes.array.isRequired,
};

export default DineSykmeldinger;
