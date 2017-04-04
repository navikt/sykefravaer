import React, { PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import { Soknad, toDatePrettyPrint, getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Statuspanel from './Statuspanel';
import { SENDT, TIL_SENDING } from '../../statuser/sykepengesoknadstatuser';

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

const SendtSoknad = ({ ledetekster, sykepengesoknad }) => {
    const nokkelOpplysninger = [[{
        tittel: getLedetekst('sykepengesoknad.oppsummering.status.label', ledetekster),
        opplysning: getStatusTittel(sykepengesoknad.status),
        hjelpetekst: sykepengesoknad.status === TIL_SENDING ? tilSendingHjelpetekst() : null,
    }, {
        tittel: getLedetekst('sykepengesoknad.oppsummering.dato.label', ledetekster),
        opplysning: toDatePrettyPrint(sykepengesoknad.innsendtDato),
    }], [{
        tittel: getLedetekst('sykepengesoknad.oppsummering.arbeidsgiver.label', ledetekster),
        opplysning: sykepengesoknad.arbeidsgiver.navn,
    }, {
        tittel: getLedetekst('sykepengesoknad.oppsummering.organisasjonsnummer.label', ledetekster),
        opplysning: sykepengesoknad.arbeidsgiver.orgnummer,
    }]];

    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel', ledetekster)} />
        <Statuspanel opplysninger={nokkelOpplysninger} />
        <SykmeldingUtdrag ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} />
        <Soknad ledetekster={ledetekster} sykepengesoknad={sykepengesoknad} tittel={'Oppsummering'} />
        <div className="bekreftet-container">
            <Avkrysset tekst={getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label', ledetekster)} />
        </div>
    </div>);
};

SendtSoknad.propTypes = {
    ledetekster: PropTypes.object,
    sykepengesoknad: PropTypes.object,
};

export default SendtSoknad;
