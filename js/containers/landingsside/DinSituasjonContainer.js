import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { senesteTom, sykmeldingstatuser as statuser, arbeidssituasjoner as situasjoner } from 'digisyfo-npm';
import DinSituasjon from '../../components/landingsside/DinSituasjon';

const { BEKREFTET, SENDT, TIL_SENDING } = statuser;
const { ARBEIDSTAKER } = situasjoner;

export function sykmeldingerYngreEnnTreMaanederSelector(state) {
    const treMndSiden = new Date();
    treMndSiden.setMonth(treMndSiden.getMonth() - 3);

    return state.dineSykmeldinger.data.filter((sykmelding) => {
        return senesteTom(sykmelding.mulighetForArbeid.perioder) > treMndSiden;
    });
}

export function aktuelleArbeidssituasjonerSelector(state) {
    return [...new Set(sykmeldingerYngreEnnTreMaanederSelector(state).filter((sykmelding) => {
        return sykmelding.status === BEKREFTET;
    }).map((sykmelding) => {
        return sykmelding.valgtArbeidssituasjon;
    }))];
}

export function arbeidsgivereIDinSituasjonSelector(state) {
    const orgnummereMedLedere = state.ledere.data.map((leder) => {
        return leder.orgnummer;
    });
    const sykmeldingerFiltrertPaPeriode = sykmeldingerYngreEnnTreMaanederSelector(state);
    const sykmeldingerMedAktivNaermesteLeder = state.dineSykmeldinger.data.filter((sykmelding) => {
        const orgnummer = sykmelding.mottakendeArbeidsgiver
            ? sykmelding.mottakendeArbeidsgiver.virksomhetsnummer
            : sykmelding.orgnummer;
        return orgnummereMedLedere.indexOf(orgnummer) > -1;
    });
    const sykmeldingerMedAktivLederEllerMindreEnnTreMaanederGammel = [
        ...sykmeldingerMedAktivNaermesteLeder,
        ...sykmeldingerFiltrertPaPeriode,
    ];
    return [...new Set(sykmeldingerMedAktivLederEllerMindreEnnTreMaanederGammel.filter((sykmelding) => {
        return sykmelding.status === SENDT || sykmelding.status === TIL_SENDING;
    }).map((sykmelding) => {
        return sykmelding.mottakendeArbeidsgiver.navn;
    }))];
}

export const Container = ({ arbeidsgivere, arbeidssituasjoner }) => {
    return ((arbeidsgivere && arbeidsgivere.length) || (arbeidssituasjoner && arbeidssituasjoner.length))
        ? <DinSituasjon arbeidsgivere={arbeidsgivere} arbeidssituasjoner={arbeidssituasjoner} />
        : null;
};

Container.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(PropTypes.string),
    arbeidssituasjoner: PropTypes.arrayOf(PropTypes.string),
};

export const mapStateToProps = (state) => {
    const arbeidsgivere = arbeidsgivereIDinSituasjonSelector(state);
    const arbeidssituasjoner = aktuelleArbeidssituasjonerSelector(state)
        .filter((arbeidssituasjon) => {
            return !(arbeidssituasjon === ARBEIDSTAKER && arbeidsgivere.length);
        });
    return {
        arbeidsgivere,
        arbeidssituasjoner,
    };
};

const DinSituasjonContainer = connect(mapStateToProps)(Container);
export default DinSituasjonContainer;
