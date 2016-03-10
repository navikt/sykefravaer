import React, { PropTypes, Component } from 'react';

class PageTitle extends Component {
	render() {
		return <h1 className="typo-sidetittel tittel-dekorert blokk-l">{this.props.children}</h1>
	}
}

export default PageTitle;