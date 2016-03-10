import React, { PropTypes, Component } from 'react';
import DineSykmeldingerContainer from "../components/DineSykmeldinger.js";
import {connect} from 'react-redux';
import Side from "./Side.js";

class DineSykmldSide extends Component {
	render() {
    	return <Side router={this.props.router}>
    		<DineSykmeldingerContainer {...this.props} />
    	</Side> 
	}
}

function mapStateToProps(state, ownProps) {
	return Object.assign({}, state, {
    	router: ownProps
    });
}

const DineSykmeldingerSide = connect(mapStateToProps)(DineSykmldSide);

export default DineSykmeldingerSide;