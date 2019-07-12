import React from 'react';
import { connect } from 'react-redux';
import NaermesteLeder from './NaermesteLeder';
import { naermesteLeder as naermesteLederPt } from '../../propTypes/index';

export const Container = ({ leder }) => (leder
    ? <NaermesteLeder leder={leder} />
    : null);

Container.propTypes = {
    leder: naermesteLederPt,
};

export const mapStateToProps = (state, ownProps) => ({
    leder: state.ledere.data.filter(leder => leder.organisasjonsnavn === ownProps.organisasjonsnavn)[0],
});

const NaermesteLederContainer = connect(mapStateToProps)(Container);
export default NaermesteLederContainer;
