/* eslint arrow-body-style: ["error", "as-needed"] */

import React from 'react';
import {
    getLedetekst, senesteTom, sykmeldingstatuser, tidligsteFom, tilLesbarPeriodeMedArstall,
} from '@navikt/digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import SykmeldingPeriodeinfo from './SykmeldingPeriodeinfo';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import {
    Inngangspanel, InngangspanelHeader, InngangspanelIkon, InngangspanelInnhold, InngangspanelTekst,
} from '../../components/Inngangspanel';
import { PeriodeListe } from './PeriodeListe';

export const InngangspanelIkonSykmelding = () => (
    <InngangspanelIkon
        ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sykmeldinger.svg`}
        ikonHover={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sykmeldinger_hover-blue.svg`}
    />
);

const SykmeldingTeaser = ({ sykmelding }) => {
    const antallPerioder = sykmelding.mulighetForArbeid.perioder.length;
    const visStatus = sykmelding.status !== sykmeldingstatuser.NY;

    return (
        <article aria-labelledby={`sykmelding-header-${sykmelding.id}`}>
            <Inngangspanel
                to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}`}>
                <InngangspanelIkonSykmelding />
                <InngangspanelInnhold>
                    <InngangspanelHeader
                        id={`sykmelding-header-${sykmelding.id}`}
                        meta={
                            tilLesbarPeriodeMedArstall(
                                tidligsteFom(sykmelding.mulighetForArbeid.perioder),
                                senesteTom(sykmelding.mulighetForArbeid.perioder),
                            )
                        }
                        tittel={getLedetekst('sykmelding.teaser.tittel')}
                        status={visStatus ? getLedetekst(`sykmelding.teaser.status.${sykmelding.status}`) : null} />
                    <InngangspanelTekst>
                        {
                            antallPerioder === 1
                                ? (
                                    <SykmeldingPeriodeinfo
                                        className="sist"
                                        periode={sykmelding.mulighetForArbeid.perioder[0]}
                                        arbeidsgiver={sykmelding.innsendtArbeidsgivernavn} />
                                )
                                : (
                                    <PeriodeListe
                                        perioder={sykmelding.mulighetForArbeid.perioder}
                                        arbeidsgiver={sykmelding.innsendtArbeidsgivernavn} />
                                )
                        }
                    </InngangspanelTekst>
                </InngangspanelInnhold>
            </Inngangspanel>
        </article>
    );
};

SykmeldingTeaser.propTypes = {
    sykmelding: sykmeldingPt,
};

export default SykmeldingTeaser;
