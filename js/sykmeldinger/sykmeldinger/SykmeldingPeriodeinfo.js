import React from 'react';
import PropTypes from 'prop-types';
import { getDuration, getLedetekst, toDate } from '@navikt/digisyfo-npm';
import { sykmeldingperiode } from '../../propTypes';

const SykmeldingPeriodeinfo = ({ periode, arbeidsgiver, Element = 'p' }) => {
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
    if (toDate(periode.fom).getTime() === toDate(periode.tom).getTime()) {
        ledetekstNokkel += '.en-dag';
    }
    if (!arbeidsgiver) {
        ledetekstNokkel += '.uten-arbeidsgiver';
    }
    if (periode.grad === null) {
        ledetekstNokkel += '.ingen-grad';
    }
    if (periode.reisetilskudd && periode.grad) {
        ledetekstNokkel += '.gradert';
    }
    return (<Element className="js-periode">{getLedetekst(ledetekstNokkel, {
        '%GRAD%': periode.grad,
        '%ARBEIDSGIVER%': arbeidsgiver,
        '%DAGER%': getDuration(periode.fom, periode.tom),
        '%BEHANDLINGSDAGER%': periode.behandlingsdager,
    })}</Element>);
};

SykmeldingPeriodeinfo.propTypes = {
    periode: sykmeldingperiode,
    arbeidsgiver: PropTypes.string,
    Element: PropTypes.string,
};

export default SykmeldingPeriodeinfo;
