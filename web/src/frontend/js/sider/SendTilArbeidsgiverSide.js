import React, { PropTypes, Component } from 'react';
import Side from "./Side.js";
import { DineSykmeldingerContainer } from "../containers/DineSykmeldinger.js";
import Kvittering from "../components/Kvittering.js";
import SendTilArbeidsgiver from "../components/SendTilArbeidsgiver.js";
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action_creators.js';
 

class Controller extends Component {
	render() {
		return <Side router={this.props.router}>
					<SendTilArbeidsgiver {...this.props} />
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

export const SendTilArbeidsgiverSide = connect(mapStateToProps, actionCreators)(Controller);