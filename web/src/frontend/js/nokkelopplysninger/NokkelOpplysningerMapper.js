import React, { PropTypes } from 'react';
import { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } from './NokkelOpplysningerEnum';
import { SykmeldingNokkelOpplysning } from '../components/SykmeldingOpplysning';
import { toDatePrettyPrint } from '../utils/datoUtils';
import { getLedetekst } from '../ledetekster/index';

const getStatus = (ledetekster, sykmelding) => {
    return (<SykmeldingNokkelOpplysning tittel={getLedetekst('statuspanel.status', ledetekster)}>
        <p className="js-status">{getLedetekst(`statuspanel.status.${sykmelding.status}`, ledetekster)}</p>
    </SykmeldingNokkelOpplysning>);
};

const getInnsendtDato = (ledetekster, sykmelding) => {
    return (<SykmeldingNokkelOpplysning tittel={getLedetekst('statuspanel.dato', ledetekster)}>
        <p className="js-dato">{toDatePrettyPrint(sykmelding.sendtdato)}</p>
    </SykmeldingNokkelOpplysning>);
};

const getArbeidsgiver = (ledetekster, sykmelding) => {
    return (<SykmeldingNokkelOpplysning tittel={getLedetekst('statuspanel.arbeidsgiver', ledetekster)}>
        <p className="js-arbeidsgiver">{sykmelding.innsendtArbeidsgivernavn}</p>
    </SykmeldingNokkelOpplysning>);
};

const getOrgnummer = (ledetekster, sykmelding) => {
    return (<SykmeldingNokkelOpplysning tittel={getLedetekst('statuspanel.organisasjonsnummer', ledetekster)}>
        <p className="js-organisasjonsnummer">{sykmelding.orgnummer}</p>
    </SykmeldingNokkelOpplysning>);
};

const StatusOpplysning = ({ sykmelding, ledetekster, nokkelopplysning }) => {
    switch (nokkelopplysning) {
        case STATUS: {
            return getStatus(ledetekster, sykmelding);
        }
        case INNSENDT_DATO: {
            return getInnsendtDato(ledetekster, sykmelding);
        }
        case ARBEIDSGIVER: {
            return getArbeidsgiver(ledetekster, sykmelding);
        }
        case ORGNUMMER: {
            return getOrgnummer(ledetekster, sykmelding);
        }
        default:
            return <noscript />;
    }
};

StatusOpplysning.propTypes = {
    sykmelding: PropTypes.object,
    nokkelopplysning: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default StatusOpplysning;

