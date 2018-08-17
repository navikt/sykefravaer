import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, sykepengesoknadstatuser } from 'digisyfo-npm';
import { destroy } from 'redux-form';
import FoerDuBegynner from '../../components/sykepengesoknad-arbeidstaker/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellArbeidstakersoknadContainer';
import SendtSoknad from '../../components/sykepengesoknad-arbeidstaker/SendtSoknad';
import UtgaattSoknad from '../../components/sykepengesoknad-arbeidstaker/UtgaattSoknad';
import Feilmelding from '../../components/Feilmelding';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes/index';
import { hentBerikelse } from '../../actions/sykepengesoknader_actions';
import AvbruttSoknad from '../../components/sykepengesoknad-arbeidstaker/AvbruttSoknad';
import { filtrerOgSorterNyeSoknader } from '../../components/sykepengesoknader/Soknader';
import { erForsteSykepengesoknad } from '../../selectors/sykepengesoknaderSelectors';

const { NY, SENDT, UTGAATT, TIL_SENDING, UTKAST_TIL_KORRIGERING, KORRIGERT, AVBRUTT, SLETTET_UTKAST } = sykepengesoknadstatuser;

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
            return <AvbruttSoknad sykepengesoknad={sykepengesoknad} />;
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
        const { params, vedlikehold, henter, erForsteSoknad, detFinnesEldreSoknader, eldsteSoknadId } = this.props;
        return (<GenerellSoknadContainer
            erForsteSoknad={erForsteSoknad}
            henter={henter}
            Component={Controller}
            params={params}
            vedlikehold={vedlikehold}
            detFinnesEldreSoknader={detFinnesEldreSoknader}
            eldsteSoknadId={eldsteSoknadId} />);
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
    detFinnesEldreSoknader: PropTypes.bool,
    eldsteSoknadId: PropTypes.string,
};

export const mapStateToProps = (state, ownProps) => {
    const henter = state.vedlikehold.henter || state.sykepengesoknader.henterBerikelse;
    const sykepengesoknadId = ownProps.params.sykepengesoknadId;
    const skalHenteBerikelse = state.sykepengesoknader.data.some((s) => {
        return s.id === sykepengesoknadId;
    });

    const soknader = filtrerOgSorterNyeSoknader(state.sykepengesoknader.data);
    const eldsteSoknadId = soknader[0] ? soknader[0].id : '';
    const detFinnesEldreSoknader = eldsteSoknadId !== sykepengesoknadId;

    return {
        henter,
        sykepengesoknadId,
        vedlikehold: state.vedlikehold.data.vedlikehold,
        erForsteSoknad: erForsteSykepengesoknad(state),
        skalHenteBerikelse,
        detFinnesEldreSoknader,
        eldsteSoknadId,
    };
};

const FoerDuBegynnerContainer = connect(mapStateToProps, {
    hentBerikelse,
    destroy,
})(Container);

export default FoerDuBegynnerContainer;
