import React, { PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import { Soknad, toDatePrettyPrint, getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Statuspanel from './Statuspanel';
import { SENDT, TIL_SENDING } from '../../enums/sykepengesoknadstatuser';
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

const getStatusTittel = (status) => {
    let statustekst;
    if (status === SENDT) {
        statustekst = getLedetekst('sykepengesoknad.status.SENDT');
    } else if (status === TIL_SENDING) {
        statustekst = getLedetekst('sykepengesoknad.status.TIL_SENDING');
    } else {
        statustekst = 'Ukjent status';
    }
    return statustekst;
};

export const tilSendingHjelpetekst = () => {
    return (<Hjelpetekst
        tittel={getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tittel')}
        tekst={getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tekst')} />);
};

const SendtSoknad = ({ sykepengesoknad }) => {
    const nokkelOpplysninger = [[{
        tittel: getLedetekst('sykepengesoknad.oppsummering.status.label'),
        opplysning: getStatusTittel(sykepengesoknad.status),
        hjelpetekst: sykepengesoknad.status === TIL_SENDING ? tilSendingHjelpetekst() : null,
    }, {
        tittel: getLedetekst('sykepengesoknad.oppsummering.dato.label'),
        opplysning: toDatePrettyPrint(sykepengesoknad.innsendtDato),
    }], [{
        tittel: getLedetekst('sykepengesoknad.oppsummering.arbeidsgiver.label'),
        opplysning: sykepengesoknad.arbeidsgiver.navn,
    }, {
        tittel: getLedetekst('sykepengesoknad.oppsummering.organisasjonsnummer.label'),
        opplysning: sykepengesoknad.arbeidsgiver.orgnummer,
    }]];

    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
        <Statuspanel opplysninger={nokkelOpplysninger} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
        <Soknad sykepengesoknad={sykepengesoknad} tittel={'Oppsummering'} />
        <div className="bekreftet-container">
            <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label')} />
        </div>
    </div>);
};

SendtSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default SendtSoknad;
