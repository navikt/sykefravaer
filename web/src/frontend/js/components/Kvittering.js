import React, { Component } from 'react';

class Kvittering extends Component {
	render() {
		return <div className={"panel panel-melding side-innhold " + this.props.className}>
				<h2 className="hode hode-suksess hode-dekorert hode-undertittel blokk">{this.props.tittel}</h2>
				<div className="redaksjonelt-innhold typo-infotekst">{this.props.children}</div>
			</div>
	}
}

export default Kvittering;