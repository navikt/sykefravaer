/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import cn from 'classnames';
import { getDuration, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm/lib/utils/datoUtils';
import { sorterPerioderEldsteFoerst } from '@navikt/digisyfo-npm/lib/utils/sorterSykmeldingerUtils';
import { smSykmeldingPeriodePt, smSykmeldingPerioderPt, smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

export const SykmeldingOpplysninger = ({ smSykmelding }) => (
    <article>
        <header className="panelHeader panelHeader--lysebla">
            <img className="panelHeader__ikon" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/person.svg`} alt="Du" />
        </header>

        <div className="panel blokk dine-opplysninger">
            <h2 className="typo-innholdstittel blokk-l">Sykmelding</h2>

            <div className="blokk-l side-innhold">
                <SykmeldingPerioder perioder={smSykmelding.sykmeldingsperioder} />
                <div className="nokkelopplysning">
                    <h2 className="nokkelopplysning__tittel">Arbeidsgiver som legen har skrevet inn</h2>
                    <p className="js-arbeidsgiver">{smSykmelding.arbeidsgiverNavn}</p>
                </div>
                <div className="nokkelopplysning">
                    <h2 className="nokkelopplysning__tittel">Lege / sykmelder</h2>
                    <p className="js-avsender">{smSykmelding.legeNavn}</p>
                </div>
            </div>
        </div>
    </article>
);

SykmeldingOpplysninger.propTypes = {
    smSykmelding: smSykmeldingPt,
};

const perioderClass = perioder => cn('sykmeldingPerioder', { 'sykmeldingPerioder--flere': perioder.length > 1 });

const SykmeldingPerioder = ({ perioder = [] }) => (
    <div className={perioderClass(perioder)}>
        {
            sorterPerioderEldsteFoerst(perioder)
                .map((periode, index) => <SykmeldingPeriode periode={periode} key={index} />)
        }
    </div>
);

SykmeldingPerioder.propTypes = {
    perioder: smSykmeldingPerioderPt,
};

const SykmeldingPeriode = ({ periode }) => {
    const antallDager = getDuration(periode.fom, periode.tom);
    const grad = periode.grad || 100;
    return (
        <div className="nokkelopplysning">
            <h2 className="nokkelopplysning__tittel">Periode</h2>
            <p className="js-periode blokk-xxs">
                <strong>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</strong> &bull; {antallDager}&nbsp;{antallDager > 1 ? 'dager' : 'dag'}
            </p>
            <p className="js-grad">
                {grad} % sykmeldt
            </p>
        </div>
    );
};


SykmeldingPeriode.propTypes = {
    periode: smSykmeldingPeriodePt,
};
