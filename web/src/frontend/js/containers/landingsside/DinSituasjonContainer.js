import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {senesteTom} from "digisyfo-npm";
import DinSituasjon from '../../components/landingsside/DinSituasjon';

function filtrerSykemeldingerPaaPeriode(sykmeldinger) {
    const treMndSiden = new Date();
    treMndSiden.setMonth(treMndSiden.getMonth() - 3);

    return sykmeldinger.filter((sykmelding) => {
        return senesteTom(sykmelding.mulighetForArbeid.perioder) > treMndSiden;
    });
}

function filtrerArbeidssituasjoner(sykmeldinger) {
    return [...new Set(sykmeldinger.filter((sykmelding) => {
        return sykmelding.status === 'BEKREFTET';
    }).map((sykmelding) => {
        return mapArbeidssituasjonString(sykmelding.valgtArbeidssituasjon);
    }))];
}

function filtrerArbeidsgivere(sykmeldinger) {
    return [...new Set(sykmeldinger.filter((sykmelding) => {
        return sykmelding.status === 'SENDT';
    }).map((sykmelding) => {
        return sykmelding.innsendtArbeidsgivernavn;
    }))];
}

function mapArbeidssituasjonString(arbeidssituasjon) {
    switch (arbeidssituasjon) {
        case 'ARBEIDSTAKER':
            return 'Arbeidstaker';
        case 'NAERINGSDRIVENDE':
            return 'Selvstendig næringsdrivende';
        case 'FRILANSER':
            return 'Frilanser';
        case 'ARBEIDSLEDIG':
            return 'Arbeidsledig';
        default:
            return 'Annet';
    }
}

const Container = ({ arbeidsgivere, arbeidssituasjoner }) => {
    if ((!arbeidsgivere || arbeidsgivere.length === 0) && (!arbeidssituasjoner || arbeidssituasjoner.length === 0)) {
        return null;
    }
    return <DinSituasjon arbeidsgivere={arbeidsgivere} arbeidssituasjoner={arbeidssituasjoner} />;
};

Container.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(PropTypes.string),
    arbeidssituasjoner: PropTypes.arrayOf(PropTypes.string),
};

export const mapStateToProps = (state) => {
    const sykmeldingerFiltrertPaaPeriode = filtrerSykemeldingerPaaPeriode(state.dineSykmeldinger.data);
    return {
        arbeidsgivere: filtrerArbeidsgivere(sykmeldingerFiltrertPaaPeriode),
        arbeidssituasjoner: filtrerArbeidssituasjoner(sykmeldingerFiltrertPaaPeriode),
    };
};

const DinSituasjonContainer = connect(mapStateToProps)(Container);
export default DinSituasjonContainer;
