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
		<h2 className="js-title">{getLedetekst('sykmelding.teaser.tittel', {
			'%FOM%': formatDate(sykmelding.fom),
			'%TOM%': formatDate(sykmelding.tom),
		})}</h2>
		<p className="js-meta typo-infotekst">
			{getLedetekst('sykmelding.teaser.tekst', {
				'%GRAD%': sykmelding.grad,
				'%ARBEIDSGIVER%': sykmelding.arbeidsgiver,
				'%DAGER%': days,
			})}
			<small> – {sykmelding.status}</small>
		</p>
	</Link>);
};

SykmeldingTeaser.propTypes = {
	sykmelding: PropTypes.object.isRequired,
};

export default SykmeldingTeaser;
