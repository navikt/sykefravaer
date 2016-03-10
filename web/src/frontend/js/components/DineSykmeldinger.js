import React, { PropTypes, Component } from 'react';
import PageTitle from "../components/fragments.js";
import SykmeldingTeaser from "../components/SykmeldingTeaser.js";
import SykmeldingTeasere from "../components/SykmeldingTeasere.js";
import {connect} from 'react-redux';
import { getLedetekst } from '../ledetekster';

class DineSykmeldinger extends Component {

	render() {
		return <div>
					<h1 className="side-header typo-sidetittel">{getLedetekst("dine-sykmeldinger.tittel")}</h1>
					<SykmeldingTeasere 
						sykmeldinger={this.props.sykmeldinger.filter((sykmld) => {
							return sykmld.status === "UBEKREFTET"
						})}
						tittel="Nye sykmeldinger"
						ingenSykmeldingerMelding="Du har ingen nye sykmeldinger."
						className="js-nye-sykmeldinger" />
					<SykmeldingTeasere 
						sykmeldinger={this.props.sykmeldinger.filter((sykmld) => {
							return sykmld.status !== "UBEKREFTET"
						})}
						tittel="Behandlede sykmeldinger"
						ingenSykmeldingerMelding="Du har ingen behandlede sykmeldinger."
						className="js-behandlede" />
				</div>
	}
}

DineSykmeldinger.propTypes = {
   sykmeldinger: React.PropTypes.array.isRequired
}

DineSykmeldinger.defaultProps = {
	sykmeldinger: []
}

export default DineSykmeldinger;
