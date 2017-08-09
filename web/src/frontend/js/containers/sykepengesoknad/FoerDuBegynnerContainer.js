import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import FoerDuBegynner from '../../components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import SendtSoknad from '../../components/sykepengesoknad/SendtSoknad';
import UtgaattSoknad from '../../components/sykepengesoknad/UtgaattSoknad';
import AvbruttSoknad from '../../components/sykepengesoknad/AvbruttSoknad';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';
import { getLedetekst } from 'digisyfo-npm';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import { NY, SENDT, UTGAATT, TIL_SENDING, UTKAST_TIL_KORRIGERING, KORRIGERT, AVBRUTT } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { hentBerikelse } from '../../actions/sykepengesoknader_actions';

export const Controller = (props) => {
    const { sykepengesoknad, vedlikehold } = props;
    if (vedlikehold.datospennMedTid) {
        return (<Feilmelding tittel={getLedetekst('under-vedlikehold.varsel.tittel')} melding={getLedetekst('under-vedlikehold.varsel.tekst', {
            '%FRA%': datoMedKlokkeslett(vedlikehold.datospennMedTid.fom),
            '%TIL%': datoMedKlokkeslett(vedlikehold.datospennMedTid.tom),
        })} />);
    }
    if (sykepengesoknad.status === NY || sykepengesoknad.status === UTKAST_TIL_KORRIGERING) {
        return <FoerDuBegynner {...props} />;
    }
    if (sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING || sykepengesoknad.status === KORRIGERT) {
        return <SendtSoknad sykepengesoknad={sykepengesoknad} />;
    }
    if (sykepengesoknad.status === UTGAATT) {
        return <UtgaattSoknad sykepengesoknad={sykepengesoknad} />;
    }
    if (sykepengesoknad.status === AVBRUTT) {
        return <AvbruttSoknad sykepengesoknad={sykepengesoknad} />;
    }
    return <Feilmelding tittel="Søknaden har ukjent status" />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    vedlikehold: PropTypes.shape({
        datospennMedTid: PropTypes.object,
    }),
};

export class FoerDuBegynnerContainer extends Component {
    componentDidMount() {
        this.props.hentBerikelse(this.props.sykepengesoknadId);
    }

    render() {
        const { params, vedlikehold, brodsmuler, henter } = this.props;
        if (henter) {
            return <AppSpinner />;
        }
        return <GenerellSoknadContainer Component={Controller} brodsmuler={brodsmuler} params={params} vedlikehold={vedlikehold} />;
    }
}


FoerDuBegynnerContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
    sykepengesoknadId: PropTypes.string,
    brodsmuler: PropTypes.array,
    henter: PropTypes.bool,
    vedlikehold: PropTypes.object,
    hentBerikelse: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const henter = state.vedlikehold.henter || state.sykepengesoknader.henterBerikelse;
    const sykepengesoknadId = ownProps.params.sykepengesoknadId;

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

    return {
        henter,
        brodsmuler,
        sykepengesoknadId,
        vedlikehold: state.vedlikehold.data.vedlikehold,
    };
};

const foerDuBegynnerContainer = connect(mapStateToProps, {
    hentBerikelse,
})(FoerDuBegynnerContainer);

export default foerDuBegynnerContainer;
