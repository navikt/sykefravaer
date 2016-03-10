import React, { PropTypes, Component } from 'react';
import SykmeldingTeaser from "./SykmeldingTeaser.js";
import { getLedetekst } from "../ledetekster";

const SykmeldingTeasere = ({sykmeldinger, className, tittel, ingenSykmeldingerMelding}) => {

	return <div className="blokk-l">
			<div className="panel panel-modul-header">
				<h2 className="typo-undertittel">{tittel}</h2>
			</div>
			<div className={className || "js-content"}>
				{
					(sykmeldinger.length ? sykmeldinger.map((sykmelding, idx) => {
						return <SykmeldingTeaser key={idx} sykmelding={sykmelding} />
					}) : <p className="panel typo-infotekst">{ingenSykmeldingerMelding}</p>)
				}
			</div>		
	</div>
}

export default SykmeldingTeasere;