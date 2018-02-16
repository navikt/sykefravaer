import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/ledere_actions';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';
import BekreftFeilLeder, { LederAvkreftet } from '../../components/landingsside/BekreftFeilLeder';

export const Container = (props) => {
    if (props.leder.avkreftet) {
        return <LederAvkreftet onLukk={props.onAvbryt} />;
    }
    return <BekreftFeilLeder {...props} />;
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
