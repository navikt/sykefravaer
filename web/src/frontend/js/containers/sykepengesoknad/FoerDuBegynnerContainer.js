import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { destroy } from 'redux-form';
import FoerDuBegynner from '../../components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import SendtSoknad from '../../components/sykepengesoknad/SendtSoknad';
import UtgaattSoknad from '../../components/sykepengesoknad/UtgaattSoknad';
import AvbruttSoknadContainer from './AvbruttSoknadContainer';
import Feilmelding from '../../components/Feilmelding';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import { NY, SENDT, UTGAATT, TIL_SENDING, UTKAST_TIL_KORRIGERING, KORRIGERT, AVBRUTT, SLETTET_UTKAST } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { SYKEPENGER_SKJEMANAVN } from '../../components/sykepengesoknad/setup';
import { hentBerikelse } from '../../actions/sykepengesoknader_actions';

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
    componentWillMount() {
        if (this.props.brukerHarNavigertTilAnnenSoknad) {
            this.props.destroy(SYKEPENGER_SKJEMANAVN);
        }
    }

    componentDidMount() {
        this.props.hentBerikelse(this.props.sykepengesoknadId);
    }

    render() {
        const { params, vedlikehold, henter } = this.props;
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
        return <GenerellSoknadContainer henter={henter} Component={Controller} brodsmuler={brodsmuler} params={params} vedlikehold={vedlikehold} />;
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
    brukerHarNavigertTilAnnenSoknad: PropTypes.bool,
    destroy: PropTypes.func,
};

export const mapStateToProps = (state, ownProps) => {
    const henter = state.vedlikehold.henter || state.sykepengesoknader.henterBerikelse;
    const sykepengesoknadId = ownProps.params.sykepengesoknadId;

    let brukerHarNavigertTilAnnenSoknad;

    try {
        const forrigeId = state.form[SYKEPENGER_SKJEMANAVN].values.id;
        brukerHarNavigertTilAnnenSoknad = forrigeId && forrigeId !== sykepengesoknadId;
    } catch (e) {
        brukerHarNavigertTilAnnenSoknad = false;
    }

    return {
        brukerHarNavigertTilAnnenSoknad,
        henter,
        sykepengesoknadId,
        vedlikehold: state.vedlikehold.data.vedlikehold,
    };
};

const FoerDuBegynnerContainer = connect(mapStateToProps, {
    hentBerikelse,
    destroy,
})(Container);

export default FoerDuBegynnerContainer;
