import React, { PropTypes } from 'react';
import DineSykmeldingerContainer from '../components/DineSykmeldinger.js';
import { connect } from 'react-redux';
import Side from './Side.js';

const DineSykmldSide = (state) => {
	return (<Side router={state.router}>
		<DineSykmeldingerContainer sykmeldinger={state.sykmeldinger} />
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

const DineSykmeldingerSide = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerSide;
