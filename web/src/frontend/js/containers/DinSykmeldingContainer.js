import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action_creators.js';
import Side from '../sider/Side.js';
import DinSykmelding from '../components/DinSykmelding.js';

const Controller = (state) => {
	return (<Side router={state.router}>
		<DinSykmelding sykmelding={state.sykmelding} />
	</Side>);
};

Controller.propTypes = {
	router: PropTypes.object,
	props: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	const sykmelding = state.sykmeldinger.filter((sykmld) => {
		return sykmld.id === Number(ownProps.params.sykmeldingId);
	})[0];

	return Object.assign({}, { sykmelding }, {
		router: ownProps,
	}, {
		applikasjon: state.applikasjon,
	});
}

export const DinSykmeldingContainer = connect(mapStateToProps, actionCreators)(Controller);
