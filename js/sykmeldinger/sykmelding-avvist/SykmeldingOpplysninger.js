/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import cn from 'classnames';
import PT from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { getDuration, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm/lib/utils/datoUtils';
import { sorterPerioderEldsteFoerst } from '@navikt/digisyfo-npm/lib/utils/sorterSykmeldingerUtils';
import { smSykmeldingPeriodePt, smSykmeldingPerioderPt, smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

export const SykmeldingOpplysninger = ({ smSykmelding }) => (
    <article>
        <div className="panel blokk dine-opplysninger">
            <h2 className="typo-innholdstittel blokk-l">{getLedetekst('din-sykmelding.tittel')}</h2>

            <div className="blokk-l side-innhold">
                <SykmeldingPerioder perioder={smSykmelding.sykmeldingsperioder} />
                <Nokkelopplysning
                    vis={smSykmelding.arbeidsgiver !== null}
                    tittel={getLedetekst('din-sykmelding.arbeidsgiver.tittel')}
                    tekst={smSykmelding.arbeidsgiver ? smSykmelding.arbeidsgiver.navn : ''}
                />
                <Nokkelopplysning
                    tittel={getLedetekst('din-sykmelding.avsender.tittel')}
                    tekst={smSykmelding.legeNavn}
                />
            </div>
        </div>
    </article>
);

SykmeldingOpplysninger.propTypes = {
    smSykmelding: smSykmeldingPt,
};


const Nokkelopplysning = ({ vis = true, tittel, tekst }) => (
    vis
        ? (
            <div className="nokkelopplysning">
                <h2 className="nokkelopplysning__tittel">{tittel}</h2>
                <p className="js-avsender">{tekst}</p>
            </div>
        )
        : null
);

Nokkelopplysning.propTypes = {
    vis: PT.bool,
    tittel: PT.string.isRequired,
    tekst: PT.string.isRequired,
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
    const dagerBoying = antallDager > 1 ? getLedetekst('din-sykmelding.periode.dager') : getLedetekst('din-sykmelding.periode.dag');
    const grad = periode.type === 'AKTIVITET_IKKE_MULIG' ? 100 : periode.gradert.grad ? periode.gradert.grad : '';

    return (
        <div className="nokkelopplysning">
            <h2 className="nokkelopplysning__tittel">{getLedetekst('din-sykmelding.periode.tittel')}</h2>
            <p className="js-periode blokk-xxs">
                <strong>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</strong> &bull; {antallDager}&nbsp;{dagerBoying}
            </p>
            <p className="js-grad">
                {getLedetekst('din-sykmelding.grad.tekst', { '%GRAD%': grad })}
            </p>
        </div>
    );
};


SykmeldingPeriode.propTypes = {
    periode: smSykmeldingPeriodePt,
};
