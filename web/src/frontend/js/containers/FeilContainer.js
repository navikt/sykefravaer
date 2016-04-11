import React, { PropTypes } from 'react';
import SideIkkeFunnet from '../components/SideIkkeFunnet.js';
import { connect } from 'react-redux';

const FeilSide = (state) => {
    return (<SideIkkeFunnet ledetekster={state.ledetekster.data} />);
};

function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster,
    };
}

const FeilContainer = connect(mapStateToProps)(FeilSide);

export default FeilContainer;