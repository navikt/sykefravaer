import React, { PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import { Soknad, getLedetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Soknadstatuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { connect } from 'react-redux';
import { sendSykepengesoknadTilArbeidsgiver } from '../../actions/sykepengesoknader_actions';

export const Avkrysset = ({ tekst }) => {
    return (<div className="oppsummering__avkrysset">
        <img src={`${window.APP_SETTINGS.APP_ROOT}/img/png/check-box-1.png`} alt="Avkrysset" />
        <span>{tekst}</span>
    </div>);
};

Avkrysset.propTypes = {
    tekst: PropTypes.string,
};

export const Knapperad = ({ sykepengesoknad, dispatch }) => {
    if (sykepengesoknad.sendtTilArbeidsgiverDato) {
        return null;
    }
    return (<div className="knapperad">
        <button onClick={(e) => {
            e.preventDefault();
            const action = sendSykepengesoknadTilArbeidsgiver(sykepengesoknad.id);
            dispatch(action);
        }} className="js-send-til-arbeidsgiver rammeknapp">Send til arbeidsgiver</button>
    </div>);
};

Knapperad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    dispatch: PropTypes.func,
};

export const ConnectedKnapperad = connect()(Knapperad);

const SendtSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
        <Soknadstatuspanel sykepengesoknad={sykepengesoknad} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
        <Soknad sykepengesoknad={sykepengesoknad} tittel="Oppsummering" />
        <div className="bekreftet-container">
            <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')} />
        </div>
        <ConnectedKnapperad />
    </div>);
};

SendtSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtSoknad;
