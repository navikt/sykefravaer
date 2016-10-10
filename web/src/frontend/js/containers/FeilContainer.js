import React, { PropTypes } from 'react';
import SideIkkeFunnet from '../components/SideIkkeFunnet';
import { connect } from 'react-redux';

const Feilside = ({ ledetekster }) => {
    return (<SideIkkeFunnet ledetekster={ledetekster} />);
};

Feilside.propTypes = {
    ledetekster: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        ledetekster: state.ledetekster.data,
    };
}

const FeilContainer = connect(mapStateToProps)(Feilside);

export default FeilContainer;
