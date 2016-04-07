import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action_creators.js';
import Side from '../sider/Side.js';
import DinSykmelding from '../components/DinSykmelding.js';
import AppSpinner from '../components/AppSpinner.js';

const Controller = (state) => {
	console.log(state); 
	return (<Side>
		{
			(() => {
				if(state.sykmelding.henter) {
					return <AppSpinner />
				} else if(state.sykmelding.hentingFeilet) {
					return (<div className="panel typo-infotekst panel-melding">
							<h1 className="hode hode-feil hode-innholdstittel hode-dekorert blokk">Det oppstod en feil</h1>
							<p>Vennligst prøv igjen litt senere.</p>
						</div>);
				} else {
					return <DinSykmelding sykmelding={state.sykmelding.data} />;
				}
			})()
		}
	</Side>);
};

Controller.propTypes = {
	sykmelding: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	const sykmelding = state.sykmeldinger.data.filter((sykmld) => {
		return sykmld.id === Number(ownProps.params.sykmeldingId);
	})[0];

	return {
		sykmelding: {
			data: sykmelding,
			hentingFeilet: state.sykmeldinger.hentingFeilet,
			henter: state.sykmeldinger.henter
		},
	};
}

export const DinSykmeldingContainer = connect(mapStateToProps, actionCreators)(Controller);
