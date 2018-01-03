import React, { Component } from 'react';
import { senesteTom, sykmeldingstatuser, log } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TidslinjeUtdrag, { MED_ARBEIDSGIVER, UTEN_ARBEIDSGIVER, VALGFRI } from '../../components/landingsside/TidslinjeUtdrag';
import { ARBEIDSTAKER } from '../../enums/arbeidssituasjoner';

const { SENDT, NY, BEKREFTET, TIL_SENDING } = sykmeldingstatuser;

const ETT_DOGN = 1000 * 60 * 60 * 24;

const getSykefravaerVarighet = (dato) => {
    const dagensDato = new Date();
    dagensDato.setHours(0);
    dagensDato.setMinutes(0);
    dagensDato.setSeconds(0);
    dagensDato.setMilliseconds(0);
    const antallDager = (dagensDato.getTime() - dato.getTime()) / ETT_DOGN;
    return Math.round(antallDager) + 1;
};

const lagreSykmeldtStatistikk = (dato, visUtdrag) => {
    try {
        let varighet = 0;
        if (dato) {
            varighet = getSykefravaerVarighet(dato);
        }
        /* eslint-disable quote-props */
        window.dataLayer.push({
            'event': 'SYKEFORLOP_HENTET',
            'varighet': varighet,
            'viserTidslinjeutdrag': visUtdrag,
        });
        /* eslint-enable quote-props */
    } catch (e) {
        log(e);
    }
};

export class Container extends Component {
    componentDidMount() {
        if (!this.props.henter) {
            lagreSykmeldtStatistikk(this.props.startdato, this.props.visUtdrag);
        }
    }

    render() {
        const { visUtdrag, startdato, antallDager, visning, hentingFeilet } = this.props;
        if (!visUtdrag || hentingFeilet) {
            return null;
        }
        return <TidslinjeUtdrag startdato={startdato} antallDager={antallDager} visning={visning} />;
    }
}

Container.propTypes = {
    visUtdrag: PropTypes.bool,
    startdato: PropTypes.instanceOf(Date),
    antallDager: PropTypes.number,
    visning: PropTypes.oneOf([MED_ARBEIDSGIVER, UTEN_ARBEIDSGIVER, VALGFRI]),
    hentingFeilet: PropTypes.bool,
    henter: PropTypes.bool,
};

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
            return [SENDT, TIL_SENDING, NY, BEKREFTET].indexOf(s.status) > -1;
        }).length > 0;
};

export const getVisning = (dineSykmeldinger, startdato) => {
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
        return s.status === SENDT || s.status === TIL_SENDING || (s.status === BEKREFTET && s.valgtArbeidssituasjon === ARBEIDSTAKER);
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
    const hentingFeilet = state.sykeforloep.hentingFeilet;
    const startdato = state.sykeforloep.startdato;
    const henter = state.dineSykmeldinger.henter || state.sykeforloep.henter;

    let antallDager;

    if (startdato) {
        antallDager = getSykefravaerVarighet(startdato);
    }

    return {
        hentingFeilet,
        henter,
        visUtdrag: skalViseUtdrag(state.dineSykmeldinger.data),
        startdato,
        antallDager,
        visning: getVisning(state.dineSykmeldinger.data, startdato),
    };
};

export default connect(mapStateToProps)(Container);
