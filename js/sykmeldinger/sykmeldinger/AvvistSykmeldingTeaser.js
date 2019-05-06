import React from 'react';
import { Link } from 'react-router';
import { getLedetekst, senesteTom, tidligsteFom, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

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
    return (<article aria-labelledby={`sykmelding-header-${smSykmelding.id}`}>
        <Link
            className="inngangspanel inngangspanel--sykmelding"
            to={`${getContextRoot()}/sykmeldinger/${smSykmelding.id}`}>
            <span className="inngangspanel__ikon">
                <img
                    alt=""
                    src={
                        smSykmelding.bekreftetDato
                            ? '/sykefravaer/img/svg/sykmeldinger.svg'
                            : '/sykefravaer/img/svg/report-problem-triangle-red.svg'
                    } />
            </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`sykmelding-header-${smSykmelding.id}`}>
                        <FomTom smSykmelding={smSykmelding} />
                        <span className="inngangspanel__tittel">
                            {getLedetekst('sykmelding.teaser.tittel')}
                        </span>
                    </h3>
                    <p className="inngangspanel__status">Avvist av NAV</p>
                </header>
            </div>
        </Link>
    </article>);
};

AvvistSykmeldingTeaser.propTypes = {
    smSykmelding: smSykmeldingPt,
};

export default AvvistSykmeldingTeaser;

