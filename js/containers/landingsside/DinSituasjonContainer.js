import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { senesteTom, sykmeldingstatuser as statuser, arbeidssituasjoner as situasjoner } from 'digisyfo-npm';
import DinSituasjon from '../../components/landingsside/DinSituasjon';
import { selectDineSykmeldingerData } from '../../selectors/dineSykmeldingerSelectors';
import { selectLedereData } from '../../selectors/ledereSelectors';

const { BEKREFTET, SENDT, TIL_SENDING } = statuser;
const { ARBEIDSTAKER } = situasjoner;

export function selectSykmeldingerYngreEnnTreMaaneder(state) {
    const treMndSiden = new Date();
    treMndSiden.setMonth(treMndSiden.getMonth() - 3);

    return selectDineSykmeldingerData(state).filter((sykmelding) => {
        return senesteTom(sykmelding.mulighetForArbeid.perioder) > treMndSiden;
    });
}

export function selectArbeidsgivereTilDinSituasjon(state) {
    const orgnummereMedLedere = selectLedereData(state)
        .map((leder) => {
            return leder.orgnummer;
        });
    const sykmeldingerFiltrertPaPeriode = selectSykmeldingerYngreEnnTreMaaneder(state);
    const sykmeldingerMedAktivNaermesteLeder = selectDineSykmeldingerData(state)
        .filter((sykmelding) => {
            const orgnummer = sykmelding.mottakendeArbeidsgiver
                ? sykmelding.mottakendeArbeidsgiver.virksomhetsnummer
                : sykmelding.orgnummer;
            return orgnummereMedLedere.indexOf(orgnummer) > -1;
        });
    const sykmeldingerMedAktivLederEllerMindreEnnTreMaanederGammel = [
        ...sykmeldingerMedAktivNaermesteLeder,
        ...sykmeldingerFiltrertPaPeriode,
    ];
    return [
        ...new Set(sykmeldingerMedAktivLederEllerMindreEnnTreMaanederGammel
            .filter((sykmelding) => {
                return sykmelding.status === SENDT || sykmelding.status === TIL_SENDING;
            })
            .map((sykmelding) => {
                return sykmelding.mottakendeArbeidsgiver.navn;
            })),
    ];
}

export function selectAktuelleArbeidssituasjoner(state) {
    const arbeidsgivere = selectArbeidsgivereTilDinSituasjon(state);
    return [
        ...new Set(selectSykmeldingerYngreEnnTreMaaneder(state)
            .filter((sykmelding) => {
                return sykmelding.status === BEKREFTET;
            })
            .map((sykmelding) => {
                return sykmelding.valgtArbeidssituasjon;
            })
            .filter((arbeidssituasjon) => {
                return !(arbeidssituasjon === ARBEIDSTAKER && arbeidsgivere.length);
            })),
    ];
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
    const arbeidsgivere = selectArbeidsgivereTilDinSituasjon(state);
    const arbeidssituasjoner = selectAktuelleArbeidssituasjoner(state);

    return {
        arbeidsgivere,
        arbeidssituasjoner,
    };
};

const DinSituasjonContainer = connect(mapStateToProps)(Container);
export default DinSituasjonContainer;
