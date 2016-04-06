import React, { PropTypes } from 'react';

const Side = ({ children }) => {
	return (<div className="begrensning blokk-xl side-syfofront">
			{children}
		</div>);
};

Side.propTypes = {
	children: PropTypes.object,
};

export default Side;
