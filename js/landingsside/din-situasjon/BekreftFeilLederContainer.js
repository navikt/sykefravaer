import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../data/ledere/ledereActions';
import { naermesteLeder as naermesteLederPt } from '../../propTypes/index';
import BekreftFeilLeder, { LederAvkreftet } from './BekreftFeilLeder';

export const Container = (props) => {
    const { leder, onAvbryt } = props;
    return leder.avkreftet
        ? <LederAvkreftet onLukk={onAvbryt} />
        : <BekreftFeilLeder {...props} />;
};

Container.propTypes = {
    leder: naermesteLederPt,
    onAvbryt: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    return {
        leder: state.ledere.data.filter(leder => leder.orgnummer === ownProps.orgnummer)[0],
        onAvbryt: ownProps.onAvbryt,
        avkrefter: state.ledere.avkrefter,
        avkreftFeilet: state.ledere.avkreftFeilet,
    };
}

const BekreftFeilLederContainer = connect(mapStateToProps, actions)(Container);
export default BekreftFeilLederContainer;
