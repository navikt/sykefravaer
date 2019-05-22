/* eslint arrow-body-style: ["error", "as-needed"] */

import React from 'react';
import { getDuration, getLedetekst, senesteTom, tidligsteFom, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import { Inngangspanel, InngangspanelHeader, InngangspanelIkon, InngangspanelInnhold, InngangspanelTekst } from '../../components/Inngangspanel';
import { InngangspanelIkonSykmelding } from './Sykmeldingteaser';

export const periodeinfoNokkelBase = (type, behandlingsdager) => {
    switch (type) {
        case 'BEHANDLINGSDAGER':
            if (behandlingsdager > 1) {
                return 'sykmelding.teaser.tekst.behandlingsdager';
            }
            return 'sykmelding.teaser.tekst.behandlingsdag';
        case 'REISETILSKUDD':
            return 'sykmelding.teaser.tekst.reisetilskudd';
        case 'AVVENTENDE':
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

    if (periode.gradert === null && periode.type !== 'AKTIVITET_IKKE_MULIG') {
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

const AvvistSykmeldingTeaser = ({ smSykmelding }) => {
    const id = `sykmelding-header-${smSykmelding.id}`;
    return (<article aria-labelledby={id}>
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
                        smSykmelding.sykmeldingsperioder && smSykmelding.sykmeldingsperioder.length > 0
                            ? tilLesbarPeriodeMedArstall(tidligsteFom(smSykmelding.sykmeldingsperioder), senesteTom(smSykmelding.sykmeldingsperioder))
                            : null
                    }
                    tittel={getLedetekst('sykmelding.teaser.tittel')}
                    id={id}
                    status="Avvist av NAV" />
                <InngangspanelTekst>
                    {
                        smSykmelding.sykmeldingsperioder.length === 1
                            ? (
                                <p className="js-periode sist">
                                    {
                                        smSykmelding.sykmeldingsperioder
                                            .map(periode => (
                                                getLedetekst(finnLedetekstForPeriodeinfo(periode), {
                                                    '%GRAD%': periode.type === 'AKTIVITET_IKKE_MULIG' ? 100 : periode.gradert && periode.gradert.grad,
                                                    '%DAGER%': getDuration(periode.fom, periode.tom),
                                                    '%BEHANDLINGSDAGER%': periode.behandlingsdager,
                                                })),
                                            )
                                    }
                                </p>
                            )
                            : (
                                <ul className="teaser-punktliste js-perioder">
                                    {
                                        smSykmelding.sykmeldingsperioder.map((periode, index) => (
                                            <li className="js-periode" key={index}>
                                                {
                                                    getLedetekst(finnLedetekstForPeriodeinfo(periode), {
                                                        '%GRAD%': periode.type === 'AKTIVITET_IKKE_MULIG' ? 100 : periode.gradert && periode.gradert.grad,
                                                        '%DAGER%': getDuration(periode.fom, periode.tom),
                                                        '%BEHANDLINGSDAGER%': periode.behandlingsdager,
                                                    })
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                    }
                </InngangspanelTekst>
            </InngangspanelInnhold>
        </Inngangspanel>
    </article>);
};

AvvistSykmeldingTeaser.propTypes = {
    smSykmelding: smSykmeldingPt.isRequired,
};

export default AvvistSykmeldingTeaser;

