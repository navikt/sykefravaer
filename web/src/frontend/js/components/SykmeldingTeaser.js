import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';

const SykmeldingTeaser = ({ sykmelding }) => {
	const days = getDuration(sykmelding.fom, sykmelding.tom);

	return (<Link className="panel sykmelding-teaser"
		key={sykmelding.id}
		to={getContextRoot() + '/sykmelding/' + sykmelding.id}>
		<h3 className="js-title sykmelding-teaser-tittel" aria-label={getLedetekst('sykmelding.teaser.tittel', {
			'%FOM%': formatDate(sykmelding.fom),
			'%TOM%': formatDate(sykmelding.tom),
		})}>
			<small className="typo-normal">{getLedetekst('sykmelding.teaser.dato', {
				'%FOM%': formatDate(sykmelding.fom),
				'%TOM%': formatDate(sykmelding.tom),
			})}</small>
			<span>{getLedetekst('sykmelding.teaser.tittel')}</span>
		</h3>
		<p className="js-meta typo-infotekst">
			{getLedetekst('sykmelding.teaser.tekst', {
				'%GRAD%': sykmelding.grad,
				'%ARBEIDSGIVER%': sykmelding.arbeidsgiver,
				'%DAGER%': days,
			})}
		</p>
	</Link>);
};

SykmeldingTeaser.propTypes = {
	sykmelding: PropTypes.object.isRequired,
};

export default SykmeldingTeaser;
