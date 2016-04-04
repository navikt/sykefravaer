import React, { PropTypes } from 'react';
import SykmeldingTeaser from './SykmeldingTeaser.js';

const SykmeldingTeasere = ({ sykmeldinger, className, tittel, ingenSykmeldingerMelding }) => {
	return (<div className="blokk-l">
			<div className="panel panel-modul-header">
				<h2 className="typo-undertittel">{tittel}</h2>
			</div>
			<div className={className || 'js-content'}>
				{
					(sykmeldinger.length ? sykmeldinger.map((sykmelding, idx) => {
						return <SykmeldingTeaser key={idx} sykmelding={sykmelding} />;
					}) : <p className="panel typo-infotekst">{ingenSykmeldingerMelding}</p>)
				}
			</div>
	</div>);
};

SykmeldingTeasere.propTypes = {
	sykmeldinger: PropTypes.array,
	className: PropTypes.string,
	tittel: PropTypes.string,
	ingenSykmeldingerMelding: PropTypes.string,
};

export default SykmeldingTeasere;
