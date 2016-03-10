import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getPathByKey } from '../routers/paths.js';
import { formatDate, getDuration } from "../utils/index.js";
import { getLedetekst } from "../ledetekster";

class SykmeldingTeaser extends Component {
	render() {

		let days = getDuration(this.props.sykmelding.fom, this.props.sykmelding.tom);

		return (<Link key={this.props.sykmelding.id} className="panel sykmelding-teaser" to={getPathByKey("sykmelding").path + "/" + this.props.sykmelding.id}>
			<h2 className="js-title">{getLedetekst("sykmelding.teaser.tittel", {
				"%FOM%": formatDate(this.props.sykmelding.fom), 
				"%TOM%": formatDate(this.props.sykmelding.tom)
			})}</h2>
			<p className="js-meta typo-infotekst">
				{getLedetekst("sykmelding.teaser.tekst", {
					"%GRAD%": this.props.sykmelding.grad,
					"%ARBEIDSGIVER%": this.props.sykmelding.arbeidsgiver,
					"%DAGER%": days
				})}
				<small> – {this.props.sykmelding.status}</small>
			</p>
		</Link>)
	}
}

SykmeldingTeaser.propTypes = {
	sykmelding: PropTypes.object.isRequired
}

export default SykmeldingTeaser;