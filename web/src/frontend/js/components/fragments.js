import React, { PropTypes } from 'react';

const PageTitle = ({ children }) => {
	return <h1 className="typo-sidetittel tittel-dekorert blokk-l">{children}</h1>;
};

PageTitle.propTypes = {
	children: PropTypes.object,
};

export default PageTitle;
