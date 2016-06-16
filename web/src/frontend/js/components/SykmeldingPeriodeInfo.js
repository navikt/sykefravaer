import React, { PropTypes } from 'react';
import { getDuration } from '../utils/datoUtils';
import { getLedetekst } from '../ledetekster/index';

const SykmeldingPeriodeInfo = ({ periode, arbeidsgiver, Element = 'p', ledetekster }) => {
    let ledetekstNokkel = 'sykmelding.teaser.tekst';
    if (periode.behandlingsdager === 1) {
        ledetekstNokkel = 'sykmelding.teaser.tekst.behandlingsdag';
    }
    if (periode.behandlingsdager > 1) {
        ledetekstNokkel = 'sykmelding.teaser.tekst.behandlingsdager';
    }
    if (periode.reisetilskudd) {
        ledetekstNokkel = 'sykmelding.teaser.tekst.reisetilskudd';
    }
    if (periode.avventende) {
        ledetekstNokkel = 'sykmelding.teaser.tekst.avventende';
    }
    if (periode.fom.year === periode.fom.year && periode.fom.monthValue === periode.fom.monthValue  && periode.fom.dayOfMonth === periode.tom.dayOfMonth) {
        ledetekstNokkel += '.en-dag';
    }
    if (!arbeidsgiver) {
        ledetekstNokkel += '.uten-arbeidsgiver';
    }
    if (periode.grad === null) {
        ledetekstNokkel += '.ingen-grad';
    }
    return (<Element className="js-periode">{getLedetekst(ledetekstNokkel, ledetekster, {
        '%GRAD%': periode.grad,
        '%ARBEIDSGIVER%': arbeidsgiver,
        '%DAGER%': getDuration(periode.fom, periode.tom),
        '%BEHANDLINGSDAGER%': periode.behandlingsdager,
    })}</Element>);
};

SykmeldingPeriodeInfo.propTypes = {
    periode: PropTypes.object,
    arbeidsgiver: PropTypes.string,
    Element: PropTypes.string,
    ledetekster: PropTypes.object,
};

export default SykmeldingPeriodeInfo;
