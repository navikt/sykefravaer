import React from 'react';
import {
    getDuration, getLedetekst, senesteTom, tidligsteFom, tilLesbarPeriodeMedArstall,
} from '@navikt/digisyfo-npm';
import PropTypes from 'prop-types';
import getContextRoot from '../../utils/getContextRoot';
import { smSykmeldingPeriodePt, smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import {
    Inngangspanel, InngangspanelHeader, InngangspanelIkon, InngangspanelInnhold, InngangspanelTekst,
} from '../../components/Inngangspanel';
import { InngangspanelIkonSykmelding } from './Sykmeldingteaser';
import {
    AKTIVITET_IKKE_MULIG, AVVENTENDE, BEHANDLINGSDAGER, REISETILSKUDD,
} from '../enums/sykmeldingskjemaenums';

export const periodeinfoNokkelBase = (type, behandlingsdager) => {
    switch (type) {
        case BEHANDLINGSDAGER:
            if (behandlingsdager > 1) {
                return 'sykmelding.teaser.tekst.behandlingsdager';
            }
            return 'sykmelding.teaser.tekst.behandlingsdag';
        case REISETILSKUDD:
            return 'sykmelding.teaser.tekst.reisetilskudd';
        case AVVENTENDE:
            return 'sykmelding.teaser.tekst.avventende';
        default:
            return 'sykmelding.teaser.tekst';
    }
};

export const finnLedetekstForPeriodeinfo = (periode) => {
    let ledetekstNokkel = periodeinfoNokkelBase(periode.type, periode.behandlingsdager);

    if (getDuration(periode.fom, periode.tom) === 1) {
        ledetekstNokkel += '.en-dag';
    }

    ledetekstNokkel += '.uten-arbeidsgiver';

    if (periode.gradert === null && periode.type !== AKTIVITET_IKKE_MULIG) {
        ledetekstNokkel += '.ingen-grad';
    } else if (periode.reisetilskudd) {
        ledetekstNokkel += '.gradert';
    }
    return ledetekstNokkel;
};

const FomTom = ({ smSykmelding }) => (
    smSykmelding.sykmeldingsperioder && smSykmelding.sykmeldingsperioder.length > 0
        ? (
            <small className="inngangspanel__meta">
                {tilLesbarPeriodeMedArstall(tidligsteFom(smSykmelding.sykmeldingsperioder), senesteTom(smSykmelding.sykmeldingsperioder))}
            </small>
        )
        : null
);

FomTom.propTypes = {
    smSykmelding: smSykmeldingPt,
};

export const lagPeriodetekst = periode => getLedetekst(finnLedetekstForPeriodeinfo(periode), {
    '%GRAD%': periode.type === AKTIVITET_IKKE_MULIG ? 100 : periode.gradert && periode.gradert.grad,
    '%DAGER%': getDuration(periode.fom, periode.tom),
    '%BEHANDLINGSDAGER%': periode.behandlingsdager,
});

const TeaserTekst = ({ sykmeldingsperioder }) => (
    <InngangspanelTekst>
        {
            sykmeldingsperioder.length === 1
                ? (
                    <p className="js-periode sist">
                        {lagPeriodetekst(sykmeldingsperioder[0])}
                    </p>
                )
                : (
                    <ul className="teaser-punktliste js-perioder">
                        {
                            sykmeldingsperioder.map((periode, index) => (
                                <li className="js-periode" key={index}>
                                    {lagPeriodetekst(periode)}
                                </li>
                            ))
                        }
                    </ul>
                )
        }
    </InngangspanelTekst>
);

TeaserTekst.propTypes = {
    sykmeldingsperioder: PropTypes.arrayOf(smSykmeldingPeriodePt.isRequired),
};

const AvvistSykmeldingTeaser = ({ smSykmelding }) => {
    const id = `sykmelding-header-${smSykmelding.id}`;
    const perioder = smSykmelding.sykmeldingsperioder;

    return (
        <article aria-labelledby={id}>
            <Inngangspanel
                className="inngangspanel--sykmelding"
                to={`${getContextRoot()}/sykmeldinger/${smSykmelding.id}`}>
                {
                    smSykmelding.bekreftetDato
                        ? <InngangspanelIkonSykmelding />
                        : <InngangspanelIkon ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/report-problem-triangle-red.svg`} />
                }
                <InngangspanelInnhold>
                    <InngangspanelHeader
                        meta={
                            perioder && perioder.length > 0
                                ? tilLesbarPeriodeMedArstall(tidligsteFom(perioder), senesteTom(perioder))
                                : null
                        }
                        tittel={getLedetekst('sykmelding.teaser.tittel')}
                        id={id}
                        status="Avvist av NAV"
                    />
                    <TeaserTekst sykmeldingsperioder={perioder} />
                </InngangspanelInnhold>
            </Inngangspanel>
        </article>
    );
};

AvvistSykmeldingTeaser.propTypes = {
    smSykmelding: smSykmeldingPt.isRequired,
};

export default AvvistSykmeldingTeaser;
