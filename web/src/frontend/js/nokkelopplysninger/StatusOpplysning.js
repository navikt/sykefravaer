import React, { PropTypes } from 'react';
import { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } from './NokkelOpplysningerEnum';
import { Hjelpetekst, SykmeldingNokkelOpplysning, toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';

const tilSendingHjelpetekst = () => {
    return (<Hjelpetekst
        tittel={getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tittel')}
        tekst={getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tekst')} />);
};

const Status = ({ ledetekster, status }) => {
    return (<SykmeldingNokkelOpplysning Overskrift="H2" tittel={getLedetekst('statuspanel.status', ledetekster)}>
        {status === 'TIL_SENDING' ?
            <div>
                <span>{getLedetekst(`statuspanel.status.${status}`, ledetekster)}</span>
                {tilSendingHjelpetekst()}
            </div>
            :
            <p className="js-status">{getLedetekst(`statuspanel.status.${status}`, ledetekster)}</p>
        }
    </SykmeldingNokkelOpplysning>);
};

Status.propTypes = {
    ledetekster: PropTypes.object,
    status: PropTypes.string,
};

const InnsendtDato = ({ ledetekster, sendtdato, status }) => {
    let nokkel = 'statuspanel.dato.innsendt';
    if (status === 'BEKREFTET') {
        nokkel = 'statuspanel.dato.bekreftet';
    } else if (status === 'AVBRUTT') {
        nokkel = 'statuspanel.dato.avbrutt';
    }
    return (<SykmeldingNokkelOpplysning Overskrift="H2" tittel={getLedetekst(nokkel, ledetekster)}>
        <p className="js-dato">{toDatePrettyPrint(sendtdato)}</p>
    </SykmeldingNokkelOpplysning>);
};

InnsendtDato.propTypes = {
    ledetekster: PropTypes.object,
    sendtdato: PropTypes.string,
    status: PropTypes.string,
};

const Arbeidsgiver = ({ ledetekster, arbeidsgiver }) => {
    return (<SykmeldingNokkelOpplysning Overskrift="H2" tittel={getLedetekst('statuspanel.arbeidsgiver', ledetekster)}>
        <p className="js-arbeidsgiver">{arbeidsgiver}</p>
    </SykmeldingNokkelOpplysning>);
};

Arbeidsgiver.propTypes = {
    ledetekster: PropTypes.object,
    arbeidsgiver: PropTypes.string,
};

const Orgnummer = ({ ledetekster, orgnummer }) => {
    let _orgnummer = orgnummer;
    if (_orgnummer) {
        _orgnummer = _orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3');
    }
    return (<SykmeldingNokkelOpplysning Overskrift="H2" tittel={getLedetekst('statuspanel.organisasjonsnummer', ledetekster)}>
        <p className="js-organisasjonsnummer">{_orgnummer}</p>
    </SykmeldingNokkelOpplysning>);
};

Orgnummer.propTypes = {
    ledetekster: PropTypes.object,
    orgnummer: PropTypes.string,
};

const StatusOpplysning = ({ sykmelding, ledetekster, nokkelopplysning }) => {
    switch (nokkelopplysning) {
        case STATUS: {
            return <Status ledetekster={ledetekster} status={sykmelding.status} />;
        }
        case INNSENDT_DATO: {
            return <InnsendtDato ledetekster={ledetekster} sendtdato={sykmelding.sendtdato} status={sykmelding.status} />;
        }
        case ARBEIDSGIVER: {
            return <Arbeidsgiver ledetekster={ledetekster} arbeidsgiver={sykmelding.innsendtArbeidsgivernavn} />;
        }
        case ORGNUMMER: {
            return <Orgnummer ledetekster={ledetekster} orgnummer={sykmelding.orgnummer} />;
        }
        default: {
            return null;
        }
    }
};

StatusOpplysning.propTypes = {
    sykmelding: PropTypes.object,
    nokkelopplysning: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default StatusOpplysning;
