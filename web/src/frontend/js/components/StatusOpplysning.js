import React from 'react';
import PropTypes from 'prop-types';
import { SykmeldingNokkelOpplysning, toDatePrettyPrint, getLedetekst, nokkelopplysninger, sykmeldingstatuser } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { sykmelding as sykmeldingPt } from '../propTypes';

const { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } = nokkelopplysninger;
const { BEKREFTET, AVBRUTT, TIL_SENDING } = sykmeldingstatuser;

const tilSendingHjelpetekst = () => {
    return (<Hjelpetekst>{getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tekst')}</Hjelpetekst>);
};

export const StatusNokkelopplysning = ({ children, Overskrift = 'h2', tittel }) => {
    return (<SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift={Overskrift} tittel={tittel}>
        {children}
    </SykmeldingNokkelOpplysning>);
};

StatusNokkelopplysning.propTypes = {
    children: PropTypes.node,
    Overskrift: PropTypes.string,
    tittel: PropTypes.string,
};

const Status = ({ status }) => {
    return (<StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
        {status === TIL_SENDING ?
            <div className="medHjelpetekst">
                <span>{getLedetekst(`statuspanel.status.${status}`)}</span>
                {tilSendingHjelpetekst()}
            </div>
            :
            <p className="js-status">{getLedetekst(`statuspanel.status.${status}`)}</p>
        }
    </StatusNokkelopplysning>);
};

Status.propTypes = {
    status: PropTypes.string,
};

const InnsendtDato = ({ sendtdato, status }) => {
    let nokkel = 'statuspanel.dato.innsendt';
    if (status === BEKREFTET) {
        nokkel = 'statuspanel.dato.bekreftet';
    } else if (status === AVBRUTT) {
        nokkel = 'statuspanel.dato.avbrutt';
    }
    return (<StatusNokkelopplysning tittel={getLedetekst(nokkel)}>
        <p className="js-dato">{toDatePrettyPrint(sendtdato)}</p>
    </StatusNokkelopplysning>);
};

InnsendtDato.propTypes = {
    sendtdato: PropTypes.instanceOf(Date),
    status: PropTypes.string,
};

const Arbeidsgiver = ({ arbeidsgiver }) => {
    return (<StatusNokkelopplysning tittel={getLedetekst('statuspanel.arbeidsgiver')}>
        <p className="js-arbeidsgiver">{arbeidsgiver}</p>
    </StatusNokkelopplysning>);
};

Arbeidsgiver.propTypes = {
    arbeidsgiver: PropTypes.string,
};

const Orgnummer = ({ orgnummer }) => {
    let _orgnummer = orgnummer;
    if (_orgnummer) {
        _orgnummer = _orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3');
    }
    return (<StatusNokkelopplysning tittel={getLedetekst('statuspanel.organisasjonsnummer')}>
        <p className="js-organisasjonsnummer">{_orgnummer}</p>
    </StatusNokkelopplysning>);
};

Orgnummer.propTypes = {
    orgnummer: PropTypes.string,
};

const StatusOpplysning = ({ sykmelding, nokkelopplysning }) => {
    switch (nokkelopplysning) {
        case STATUS: {
            return <Status status={sykmelding.status} />;
        }
        case INNSENDT_DATO: {
            return <InnsendtDato sendtdato={sykmelding.sendtdato} status={sykmelding.status} />;
        }
        case ARBEIDSGIVER: {
            return <Arbeidsgiver arbeidsgiver={sykmelding.innsendtArbeidsgivernavn} />;
        }
        case ORGNUMMER: {
            return <Orgnummer orgnummer={sykmelding.orgnummer} />;
        }
        default: {
            return null;
        }
    }
};

StatusOpplysning.propTypes = {
    sykmelding: sykmeldingPt,
    nokkelopplysning: PropTypes.string,
};

export default StatusOpplysning;
