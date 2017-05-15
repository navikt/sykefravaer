import React, { PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import { Soknad, getLedetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Soknadstatuspanel from './Soknadstatuspanel';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

export const Avkrysset = ({ tekst }) => {
    return (<div className="oppsummering__avkrysset">
        <img src={`${window.APP_SETTINGS.APP_ROOT}/img/png/check-box-1.png`} alt="Avkrysset" />
        <span>{tekst}</span>
    </div>);
};

Avkrysset.propTypes = {
    tekst: PropTypes.string,
};

const SendtSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
        <Soknadstatuspanel sykepengesoknad={sykepengesoknad} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
        <Soknad sykepengesoknad={sykepengesoknad} tittel="Oppsummering" />
        <div className="bekreftet-container">
            <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')} />
        </div>
    </div>);
};

SendtSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtSoknad;
