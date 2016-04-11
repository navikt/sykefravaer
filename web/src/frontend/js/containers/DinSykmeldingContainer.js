import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/sykmeldinger_actions.js';
import Side from '../sider/Side.js';
import DinSykmelding from '../components/DinSykmelding.js';
import AppSpinner from '../components/AppSpinner.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';

const Controller = (state) => {
	return (<Side tittel={getLedetekst('sykmelding.vis.sidetittel', state.ledetekster.data)}>
		{
			(() => {
				if (state.sykmelding.henter) {
					return <AppSpinner ledetekster={state.ledetekster.data} />;
				} else if(state.sykmelding.hentingFeilet) {
					return (<div className="panel typo-infotekst panel-melding">
							<h1 className="hode hode-feil hode-innholdstittel hode-dekorert blokk">Det oppstod en feil</h1>
							<p>Vennligst prøv igjen litt senere.</p>
						</div>);
				} else {
					return <DinSykmelding sykmelding={state.sykmelding.data} ledetekster={state.ledetekster.data} />;
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
			henter: state.sykmeldinger.henter,
		},
		ledetekster: state.ledetekster,
	};
}

export const DinSykmeldingContainer = connect(mapStateToProps, actionCreators)(Controller);
