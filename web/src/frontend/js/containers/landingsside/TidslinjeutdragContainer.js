import React from 'react';
import { senesteTom, sykmeldingstatuser } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TidslinjeUtdrag, { MED_ARBEIDSGIVER, UTEN_ARBEIDSGIVER, VALGFRI } from '../../components/landingsside/TidslinjeUtdrag';
import { ARBEIDSTAKER } from '../../enums/arbeidssituasjoner';

const { SENDT, NY, BEKREFTET } = sykmeldingstatuser;

export const Container = ({ visUtdrag, startdato, antallDager, visning }) => {
    if (!visUtdrag) {
        return null;
    }
    return <TidslinjeUtdrag startdato={startdato} antallDager={antallDager} visning={visning} />;
};

Container.propTypes = {
    visUtdrag: PropTypes.bool,
    startdato: PropTypes.instanceOf(Date),
    antallDager: PropTypes.number,
    visning: PropTypes.oneOf([MED_ARBEIDSGIVER, UTEN_ARBEIDSGIVER, VALGFRI]),
};

const ETT_DOGN = 1000 * 60 * 60 * 24;

export const skalViseUtdrag = (sykmeldinger) => {
    if (!sykmeldinger) {
        return false;
    }
    return sykmeldinger
        .filter((s) => {
            const tom = senesteTom(s.mulighetForArbeid.perioder);
            const SJU_DAGER = ETT_DOGN * 7;
            return new Date().getTime() - tom.getTime() < SJU_DAGER;
        })
        .filter((s) => {
            return [SENDT, NY, BEKREFTET].indexOf(s.status) > -1;
        }).length > 0;
};

export const getVisning = (dineSykmeldinger, startdato) => {
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
        return s.status === SENDT || (s.status === BEKREFTET && s.valgtArbeidssituasjon === ARBEIDSTAKER)
    }).length === sykmeldingerForDetteSykeforloepetSomIkkeErNye.length;

    const harBareBekreftedeSykmeldinger = sykmeldingerForDetteSykeforloepetSomIkkeErNye.filter((s) => {
        return s.status === BEKREFTET && s.valgtArbeidssituasjon !== ARBEIDSTAKER;
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
    const startdato = state.sykeforloep.startdato;
    const dagensDato = new Date();
    dagensDato.setHours('0');
    dagensDato.setMinutes('0');
    dagensDato.setSeconds('0');
    dagensDato.setMilliseconds('0');
    let antallDager;

    if (startdato) {
        antallDager = parseInt(1 + ((new Date().getTime() - startdato.getTime()) / ETT_DOGN), 10);
    }

    return {
        visUtdrag: skalViseUtdrag(state.dineSykmeldinger.data),
        startdato,
        antallDager,
        visning: getVisning(state.dineSykmeldinger.data, startdato),
    };
};

export default connect(mapStateToProps)(Container);
