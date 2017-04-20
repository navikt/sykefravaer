import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FoerDuBegynner from '../../components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import SendtSoknad from '../../components/sykepengesoknad/SendtSoknad';
import UtgaattSoknad from '../../components/sykepengesoknad/UtgaattSoknad';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';
import { getLedetekst } from 'digisyfo-npm';
import { datoMedKlokkeslett } from '../../utils/datoUtils';
import { NY, SENDT, UTGAATT, TIL_SENDING } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

export const Controller = (props) => {
    const { sykepengesoknad, ledetekster, vedlikehold } = props;
    if (vedlikehold.datospennMedTid) {
        return (<Feilmelding tittel={getLedetekst('under-vedlikehold.varsel.tittel', ledetekster)} melding={getLedetekst('under-vedlikehold.varsel.tekst', ledetekster, {
            '%FRA%': datoMedKlokkeslett(vedlikehold.datospennMedTid.fom),
            '%TIL%': datoMedKlokkeslett(vedlikehold.datospennMedTid.tom),
        })} />);
    }

    if (sykepengesoknad.status === NY) {
        return <FoerDuBegynner {...props} />;
    }
    if (sykepengesoknad.status === SENDT || sykepengesoknad.status === TIL_SENDING) {
        return <SendtSoknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />;
    }
    if (sykepengesoknad.status === UTGAATT) {
        return <UtgaattSoknad sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />;
    }
    return <Feilmelding tittel="Søknaden har ukjent status" />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.object,
    ledetekster: PropTypes.object,
    vedlikehold: PropTypes.shape({
        datospennMedTid: PropTypes.object,
    }),
};

export const FoerDuBegynnerContainer = ({ params, vedlikehold, brodsmuler, henter }) => {
    if (henter) {
        return <AppSpinner />;
    }
    return <GenerellSoknadContainer Component={Controller} brodsmuler={brodsmuler} params={params} vedlikehold={vedlikehold} />;
};


FoerDuBegynnerContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
    brodsmuler: PropTypes.array,
    henter: PropTypes.bool,
    vedlikehold: PropTypes.object,
};

export const mapStateToProps = (state) => {
    const henter = state.vedlikehold.henter;

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
        vedlikehold: state.vedlikehold.data.vedlikehold,
    };
};

const foerDuBegynnerContainer = connect(mapStateToProps)(FoerDuBegynnerContainer);

export default foerDuBegynnerContainer;
