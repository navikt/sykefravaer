import React, { PropTypes, Component } from 'react';
import OppsummeringSkjema from '../../components/sykepengesoknad/Oppsummering/OppsummeringSkjema';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import StartIgjen from '../../components/sykepengesoknad/StartIgjen';
import Kvittering from '../../components/sykepengesoknad/Kvittering';
import { SENDT, TIL_SENDING } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { connect } from 'react-redux';
import mapSkjemasoknadToBackendsoknad from '../../components/sykepengesoknad/mapSkjemasoknadToBackendsoknad';
import * as actions from '../../actions/forskutteringssporsmal_actions';
import AppSpinner from '../../components/AppSpinner';

export class Oppsummering extends Component {
    componentWillMount() {
        const { sjekkSkalViseForskutteringssporsmal, backendsoknad } = this.props;
        sjekkSkalViseForskutteringssporsmal(backendsoknad);
    }

    render() {
        if (this.props.henterForskutteringssporsmal) {
            return <AppSpinner />;
        }
        return <OppsummeringSkjema {...this.props} />;
    }
}

Oppsummering.propTypes = {
    sjekkSkalViseForskutteringssporsmal: PropTypes.func,
    backendsoknad: sykepengesoknadPt,
    henterForskutteringssporsmal: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    return {
        henterForskutteringssporsmal: state.forskutteringssporsmal.henter === true,
        visForskutteringssporsmal: state.forskutteringssporsmal.visSporsmal === true,
        backendsoknad: mapSkjemasoknadToBackendsoknad(ownProps.skjemasoknad),
    };
};

export const ConnectedOppsummering = connect(mapStateToProps, actions)(Oppsummering);

export const Controller = (props) => {
    if (props.sykepengesoknad.status === SENDT || props.sykepengesoknad.status === TIL_SENDING) {
        return <Kvittering sykepengesoknad={props.sykepengesoknad} />;
    }
    if (props.skjemasoknad) {
        return <ConnectedOppsummering {...props} />;
    }
    return <StartIgjen sykepengesoknad={props.sykepengesoknad} />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.object,
};

const OppsummeringContainer = ({ params }) => {
    const brodsmuler = [{
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknader om sykepenger',
        sti: '/soknader/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknad',
    }];
    return (<GenerellSoknadContainer
        Component={Controller}
        brodsmuler={brodsmuler}
        params={params} />);
};

OppsummeringContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default OppsummeringContainer;
