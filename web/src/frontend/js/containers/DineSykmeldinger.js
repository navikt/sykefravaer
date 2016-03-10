import React, { PropTypes, Component } from 'react';
import PageTitle from "../components/fragments.js";
import DineSykmeldinger from "../components/DineSykmeldinger.js";
import {connect} from 'react-redux';

function mapStateToProps(state, ownProps) {
	return state;
}

export default DineSykmeldinger;
export const DineSykmeldingerContainer = connect(mapStateToProps)(DineSykmeldinger);