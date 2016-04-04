import React, { PropTypes } from 'react';

const SykmeldingOpplysning = ({ tittel, children }) => {
	return (<div className="sykmelding-opplysning">
		<h3>{tittel}</h3>
		<div>
			{children}
		</div>
	</div>);
};

SykmeldingOpplysning.propTypes = {
	tittel: PropTypes.string.isRequired,
	children: PropTypes.object,
};

export default SykmeldingOpplysning;
