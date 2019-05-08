import React from 'react';
import { getLedetekst, senesteTom, tidligsteFom, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import {
    Inngangspanel,
    InngangspanelHeader,
    InngangspanelIkon,
    InngangspanelInnhold,
} from '../../components/Inngangspanel';
import { InngangspanelIkonSykmelding } from './Sykmeldingteaser';

const FomTom = ({ smSykmelding }) => {
    return smSykmelding.sykmeldingsperioder && smSykmelding.sykmeldingsperioder.length > 0
        ? (<small className="inngangspanel__meta">
            {tilLesbarPeriodeMedArstall(tidligsteFom(smSykmelding.sykmeldingsperioder), senesteTom(smSykmelding.sykmeldingsperioder))}
        </small>)
        : null;
};

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
            </InngangspanelInnhold>
        </Inngangspanel>
    </article>);
};

AvvistSykmeldingTeaser.propTypes = {
    smSykmelding: smSykmeldingPt,
};

export default AvvistSykmeldingTeaser;

