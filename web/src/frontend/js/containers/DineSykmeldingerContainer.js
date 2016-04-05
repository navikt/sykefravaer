import React, { PropTypes } from 'react';
import DineSykmeldinger from '../components/DineSykmeldinger.js';
import { connect } from 'react-redux';
import Side from '../sider/Side.js';
import AppSpinner from '../components/AppSpinner.js';

const DineSykmldSide = (state) => {
	return (<Side router={state.router}>
		{
			state.applikasjon.laster ? <AppSpinner /> : <DineSykmeldinger sykmeldinger={state.sykmeldinger} />
		}
	</Side>);
};

DineSykmldSide.propTypes = {
	router: PropTypes.object,
	props: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
	return Object.assign({}, state, {
		router: ownProps,
	});
}

const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerContainer;
