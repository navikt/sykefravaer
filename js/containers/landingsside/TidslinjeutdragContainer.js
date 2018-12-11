import React from 'react';
import { senesteTom, sykmeldingstatuser, arbeidssituasjoner } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TidslinjeUtdrag, { MED_ARBEIDSGIVER, UTEN_ARBEIDSGIVER, VALGFRI } from '../../components/landingsside/TidslinjeUtdrag';
import { toggleFO39uker as toggleFO39ukerSelector } from '../../selectors/unleashTogglesSelectors';

const { SENDT, NY, BEKREFTET, TIL_SENDING } = sykmeldingstatuser;

const ETT_DOGN = 1000 * 60 * 60 * 24;
const TRETTINI_UKER = 7 * 39;

export const Container = (props) => {
    const { visUtdrag, startdato, antallDager, visning, hentingFeilet, toggleFO39uker } = props;
    return (!visUtdrag || hentingFeilet)
        ? null
        : <TidslinjeUtdrag
            toggleFO39uker={toggleFO39uker}
            startdato={startdato}
            antallDager={antallDager}
            visning={visning} />;
};

Container.propTypes = {
    visUtdrag: PropTypes.bool,
    startdato: PropTypes.instanceOf(Date),
    antallDager: PropTypes.number,
    visning: PropTypes.oneOf([MED_ARBEIDSGIVER, UTEN_ARBEIDSGIVER, VALGFRI]),
    hentingFeilet: PropTypes.bool,
    toggleFO39uker: PropTypes.bool,
};

const getSykefravaerVarighet = (state) => {
    const dato = state.sykeforloep.startdato;
    const erArbeidsrettetOppfolgingSykmeldtInngangAktiv = state.brukerinfo.sykmeldtinfodata.data.erArbeidsrettetOppfolgingSykmeldtInngangAktiv;
    const TVING_MER_ENN_39_UKER = 275;
    const TVING_MINDRE_ENN_39_UKER = 272;
    const dagensDato = new Date();
    dagensDato.setHours(0);
    dagensDato.setMinutes(0);
    dagensDato.setSeconds(0);
    dagensDato.setMilliseconds(0);
    const antallDager = Math.round((dagensDato.getTime() - dato.getTime()) / ETT_DOGN) + 1;
    return antallDager > 500 || !toggleFO39ukerSelector(state)
        ? antallDager
        : erArbeidsrettetOppfolgingSykmeldtInngangAktiv
            ? TVING_MER_ENN_39_UKER
            : antallDager > TRETTINI_UKER && erArbeidsrettetOppfolgingSykmeldtInngangAktiv === false
                ? TVING_MINDRE_ENN_39_UKER
                : antallDager;
};

export const skalViseUtdrag = (state) => {
    return !state.dineSykmeldinger.data
        ? false
        : state.dineSykmeldinger.data
            .filter((s) => {
                const tom = senesteTom(s.mulighetForArbeid.perioder);
                const SJU_DAGER = ETT_DOGN * 7;
                return new Date().getTime() - tom.getTime() < SJU_DAGER;
            })
            .filter((s) => {
                return [SENDT, TIL_SENDING, NY, BEKREFTET].indexOf(s.status) > -1;
            }).length > 0;
};

const getVisning = (state) => {
    const startdato = state.sykeforloep.startdato;
    const dineSykmeldinger = state.dineSykmeldinger.data;
    if (!startdato) {
        return VALGFRI;
    }

    const sykmeldingerForDetteSykeforloepet = dineSykmeldinger.filter((s) => {
        return s.identdato.getTime() >= startdato.getTime();
    });

    const sykmeldingerForDetteSykeforloepetSomIkkeErNye = sykmeldingerForDetteSykeforloepet.filter((s) => {
        return s.status !== NY;
    });

    const harBareNyeSykmeldinger = sykmeldingerForDetteSykeforloepet.filter((s) => {
        return s.status === NY;
    }).length === sykmeldingerForDetteSykeforloepet.length;

    if (harBareNyeSykmeldinger) {
        return VALGFRI;
    }

    const harBareSendteSykmeldinger = sykmeldingerForDetteSykeforloepetSomIkkeErNye.filter((s) => {
        return s.status === SENDT || s.status === TIL_SENDING || (s.status === BEKREFTET && s.valgtArbeidssituasjon === arbeidssituasjoner.ARBEIDSTAKER);
    }).length === sykmeldingerForDetteSykeforloepetSomIkkeErNye.length;

    const harBareBekreftedeSykmeldinger = sykmeldingerForDetteSykeforloepetSomIkkeErNye.filter((s) => {
        return s.status === BEKREFTET && s.valgtArbeidssituasjon !== arbeidssituasjoner.ARBEIDSTAKER;
    }).length === sykmeldingerForDetteSykeforloepetSomIkkeErNye.length;

    if (harBareSendteSykmeldinger) {
        return MED_ARBEIDSGIVER;
    }

    if (harBareBekreftedeSykmeldinger) {
        return UTEN_ARBEIDSGIVER;
    }

    return VALGFRI;
};

export const mapStateToProps = (state) => {
    const hentingFeilet = state.sykeforloep.hentingFeilet;
    const startdato = state.sykeforloep.startdato;
    const antallDager = startdato
        ? getSykefravaerVarighet(state)
        : undefined;

    return {
        hentingFeilet,
        startdato,
        antallDager,
        visUtdrag: skalViseUtdrag(state),
        visning: getVisning(state),
        toggleFO39uker: toggleFO39ukerSelector(state),
    };
};

export default connect(mapStateToProps)(Container);
