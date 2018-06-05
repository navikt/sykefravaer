import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, sykepengesoknadstatuser } from 'digisyfo-npm';
import { destroy } from 'redux-form';
import FoerDuBegynner from '../../components/sykepengesoknad-arbeidstaker/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellArbeidstakersoknadContainer';
import SendtSoknad from '../../components/sykepengesoknad-arbeidstaker/SendtSoknad';
import UtgaattSoknad from '../../components/sykepengesoknad-arbeidstaker/UtgaattSoknad';
import AvbruttSoknadContainer from './AvbruttSoknadContainer';
import Feilmelding from '../../components/Feilmelding';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes/index';
import { hentBerikelse } from '../../actions/sykepengesoknader_actions';

const { NY, SENDT, UTGAATT, TIL_SENDING, UTKAST_TIL_KORRIGERING, KORRIGERT, AVBRUTT, SLETTET_UTKAST, FREMTIDIG } = sykepengesoknadstatuser;

export const Controller = (props) => {
    const { sykepengesoknad, vedlikehold } = props;

    if (vedlikehold.datospennMedTid) {
        return (<Feilmelding
            tittel={getLedetekst('under-vedlikehold.varsel.tittel')}
            melding={getLedetekst('under-vedlikehold.varsel.tekst', {
                '%FRA%': datoMedKlokkeslett(vedlikehold.datospennMedTid.fom),
                '%TIL%': datoMedKlokkeslett(vedlikehold.datospennMedTid.tom),
            })} />);
    }
    switch (sykepengesoknad.status) {
        case NY:
        case UTKAST_TIL_KORRIGERING: {
            return <FoerDuBegynner {...props} />;
        }
        case SENDT:
        case TIL_SENDING:
        case KORRIGERT: {
            return <SendtSoknad sykepengesoknad={sykepengesoknad} />;
        }
        case UTGAATT: {
            return <UtgaattSoknad sykepengesoknad={sykepengesoknad} />;
        }
        case AVBRUTT:
        case SLETTET_UTKAST: {
            return <AvbruttSoknadContainer sykepengesoknad={sykepengesoknad} />;
        }
        default: {
            return <Feilmelding tittel="Søknaden har ukjent status" />;
        }
    }
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    vedlikehold: PropTypes.shape({
        datospennMedTid: PropTypes.object,
    }),
};

export class Container extends Component {
    componentDidMount() {
        if (this.props.skalHenteBerikelse) {
            this.props.hentBerikelse(this.props.sykepengesoknadId);
        }
    }

    render() {
        const { params, vedlikehold, henter, erForsteSoknad } = this.props;
        return (<GenerellSoknadContainer
            erForsteSoknad={erForsteSoknad}
            henter={henter}
            Component={Controller}
            params={params}
            vedlikehold={vedlikehold} />);
    }
}


Container.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
    sykepengesoknadId: PropTypes.string,
    henter: PropTypes.bool,
    vedlikehold: PropTypes.shape({
        data: PropTypes.shape({
            vedlikehold: PropTypes.bool,
        }),
    }),
    hentBerikelse: PropTypes.func,
    erForsteSoknad: PropTypes.bool,
    skalHenteBerikelse: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const henter = state.vedlikehold.henter || state.sykepengesoknader.henterBerikelse;
    const sykepengesoknadId = ownProps.params.sykepengesoknadId;
    const skalHenteBerikelse = state.sykepengesoknader.data.some((s) => {
        return s.id === sykepengesoknadId;
    });

    const erForsteSoknad = state.sykepengesoknader.data && state.sykepengesoknader.data.filter((s) => {
        return s.status === NY || s.status === FREMTIDIG;
    }).length === state.sykepengesoknader.data.length;

    return {
        henter,
        sykepengesoknadId,
        vedlikehold: state.vedlikehold.data.vedlikehold,
        erForsteSoknad,
        skalHenteBerikelse,
    };
};

const FoerDuBegynnerContainer = connect(mapStateToProps, {
    hentBerikelse,
    destroy,
})(Container);

export default FoerDuBegynnerContainer;
