import React, { PropTypes } from 'react';
const DocumentTitle = require('react-document-title');

const Side = ({ children, tittel }) => {
	return (<DocumentTitle title={tittel + ' - www.nav.no'}>
				<div className="begrensning blokk-xl side-syfofront">
					{children}
				</div>
			</DocumentTitle>);
};

Side.propTypes = {
	children: PropTypes.object,
	tittel: PropTypes.string.isRequired,
};

export default Side;
