import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../data/ledere/ledereActions';
import { naermesteLeder as naermesteLederPt } from '../../propTypes/index';
import BekreftFeilLeder, { LederAvkreftet } from './BekreftFeilLeder';

export const Container = (props) => {
    return props.leder.avkreftet
        ? <LederAvkreftet onLukk={props.onAvbryt} />
        : <BekreftFeilLeder {...props} />;
};

Container.propTypes = {
    leder: naermesteLederPt,
    onAvbryt: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    return {
        leder: state.ledere.data.filter((leder) => {
            return leder.orgnummer === ownProps.orgnummer;
        })[0],
        onAvbryt: ownProps.onAvbryt,
        avkrefter: state.ledere.avkrefter,
        avkreftFeilet: state.ledere.avkreftFeilet,
    };
}

const BekreftFeilLederContainer = connect(mapStateToProps, actions)(Container);
export default BekreftFeilLederContainer;
