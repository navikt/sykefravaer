import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';

const SykmeldingTeaser = ({ sykmelding, ledetekster }) => {
	const days = getDuration(sykmelding.fom, sykmelding.tom);

	return (<Link className="panel sykmelding-teaser"
		key={sykmelding.id}
		to={getContextRoot() + '/sykmelding/' + sykmelding.id}>
		<span className="teaser-ikon">
			<img src="/sykefravaer/img/svg/stetoskop.svg" alt="" />
		</span>
		<div className="teaser-innhold">
			<h3 className="js-title teaser-tittel" aria-labelledby={'sykmld-teaser-tittel-' + sykmelding.id + ' ' + 'sykmld-teaser-dato-' + sykmelding.id}>
				<small className="teaser-meta" id={'sykmld-teaser-dato-' + sykmelding.id}>{getLedetekst('sykmelding.teaser.dato', ledetekster, {
					'%FOM%': formatDate(sykmelding.fom),
					'%TOM%': formatDate(sykmelding.tom),
				})}</small>
				<span id={'sykmld-teaser-tittel-' + sykmelding.id}>
					{getLedetekst('sykmelding.teaser.tittel', ledetekster)}
				</span>
			</h3>
			<p className="js-meta typo-infotekst">
				{getLedetekst('sykmelding.teaser.tekst', ledetekster, {
					'%GRAD%': sykmelding.grad,
					'%ARBEIDSGIVER%': sykmelding.arbeidsgiver,
					'%DAGER%': days,
				})}
			</p>
		</div>
	</Link>);
};

SykmeldingTeaser.propTypes = {
	sykmelding: PropTypes.object.isRequired,
};

export default SykmeldingTeaser;
