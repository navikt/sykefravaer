import React, { PropTypes, Component } from 'react';
import { formatDate, getDuration } from "../utils/index.js";
import { connect } from 'react-redux';
import { getLedetekst, getHtmlLedetekst } from "../ledetekster";
import * as actionCreators from '../actions/action_creators.js';
import Side from "./Side.js";
import SendTilArbeidsgiverSide from "./SendTilArbeidsgiverSide.js";
import DinSykmelding from "../components/DinSykmelding.js";
import Kvittering from "../components/Kvittering.js";
import {DineSykmeldingerContainer} from "../containers/DineSykmeldinger.js";
import { Link } from 'react-router';

class Controller extends Component {
	render() {
		return <Side router={this.props.router}>
			{(() => {
				switch (this.props.status) {
					case "SENDT":
						return <div>
							<Kvittering className="blokk-xl" tittel={getLedetekst("sykmelding.send-til-arbeidsgiver.kvittering.tittel")}>
								<Link to="/dine-sykmeldinger">Lukk</Link>
							</Kvittering>
							<DineSykmeldingerContainer />
						</div>
					default:
						return <DinSykmelding {...this.props} />
					}	
			})()}
		</Side>	
	}
}

function mapStateToProps(state, ownProps) {
    var sykmelding = state.sykmeldinger.filter((sykmld) => {
        return sykmld.id === Number(ownProps.params.sykmeldingId)
    })[0];
    return Object.assign({}, sykmelding, {
    	router: ownProps
    });
};

export const DinSykmeldingSide = connect(mapStateToProps, actionCreators)(Controller);