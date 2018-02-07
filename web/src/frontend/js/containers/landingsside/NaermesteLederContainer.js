import React, { Component } from 'react';
import { connect } from 'react-redux';
import NaermesteLeder from '../../components/landingsside/NaermesteLeder';
import * as actions from '../../actions/ledere_actions';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';

export class Container extends Component {

    render() {
        const { leder} = this.props;
        if (!leder) {
            return null;
        }
        return <NaermesteLeder leder={leder} />;
    }
}

Container.propTypes = {
    leder: naermesteLederPt,
};

export function mapStateToProps(state, ownProps) {
    return {
        leder: state.ledere.data.filter((leder) => {
            return leder.organisasjonsnavn === ownProps.organisasjonsnavn;
        })[0],
    };
}

const NaermesteLederContainer = connect(mapStateToProps, actions)(Container);

export default NaermesteLederContainer;
