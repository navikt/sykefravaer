import React from 'react';
import { connect } from 'react-redux';
import NaermesteLeder from '../../components/landingsside/NaermesteLeder';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';

export const Container = ({ leder }) => {
    return leder
        ? <NaermesteLeder leder={leder} />
        : null;
};

Container.propTypes = {
    leder: naermesteLederPt,
};

export const mapStateToProps = (state, ownProps) => {
    return {
        leder: state.ledere.data.filter((leder) => {
            return leder.organisasjonsnavn === ownProps.organisasjonsnavn;
        })[0],
    };
};

const NaermesteLederContainer = connect(mapStateToProps)(Container);
export default NaermesteLederContainer;
