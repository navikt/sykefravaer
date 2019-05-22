/* eslint arrow-body-style: ["error", "as-needed"] */

import React from 'react';
import cn from 'classnames';
import { getLedetekst, getDuration, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import { sorterPerioderEldsteFoerst } from '@navikt/digisyfo-npm/lib/utils/sorterSykmeldingerUtils';
import { smSykmeldingPeriodePt, smSykmeldingPerioderPt } from '../../propTypes/smSykmeldingProptypes';

const perioderClass = perioder => cn('sykmeldingPerioder', { 'sykmeldingPerioder--flere': perioder.length > 1 });

export const SykmeldingPerioder = ({ perioder = [] }) => (
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

const Periodetekst = ({ periode }) => {
    switch (periode.type) {
        case 'AKTIVITET_IKKE_MULIG':
            return (
                <p className="js-grad">
                    {getLedetekst('din-sykmelding.grad.tekst', { '%GRAD%': 100 })}
                </p>
            );
        case 'GRADERT':
            return (
                <p className="js-grad">
                    {periode.gradert.grad} % sykmeldt
                    {periode.gradert.reisetilskudd ? (` ${getLedetekst('din-sykmelding.periode.med.reisetilskudd')}`) : null}
                </p>
            );
        case 'BEHANDLINGSDAGER':
            return (
                <p className="js-behandlingsdager">{periode.behandlingsdager} {getLedetekst('din-sykmelding.periode.behandlingsdager')}</p>
            );
        case 'REISETILSKUDD':
            if (periode.gradert === null) {
                return (
                    <p className="js-reisetilskudd">{getLedetekst('din-sykmelding.periode.reisetilskudd.tittel')}</p>
                );
            }
            break;
        case 'AVVENTENDE':
            return [
                <div className="blokk">
                    <p className="js-avventende">
                        {getLedetekst('din-sykmelding.periode.avventende')}
                    </p>
                </div>,
                <h4 className="nokkelopplysning__tittel">
                    {getLedetekst('din-sykmelding.periode.avventende.innspill')}
                </h4>,
                <p>{periode.innspillTilArbeidsgiver}</p>,
            ];
        default:
            return null;
    }
    return null;
};

Periodetekst.propTypes = {
    periode: smSykmeldingPeriodePt.isRequired,
};

const SykmeldingPeriode = ({ periode }) => {
    const antallDager = getDuration(periode.fom, periode.tom);
    const dagerBoying = antallDager > 1 ? getLedetekst('din-sykmelding.periode.dager') : getLedetekst('din-sykmelding.periode.dag');

    return (
        <div className="nokkelopplysning">
            <h2 className="nokkelopplysning__tittel">{getLedetekst('din-sykmelding.periode.tittel')}</h2>
            <p className="js-periode blokk-xxs">
                <strong>{tilLesbarPeriodeMedArstall(periode.fom, periode.tom)}</strong> &bull; {antallDager}&nbsp;{dagerBoying}
            </p>
            <Periodetekst periode={periode} />
        </div>
    );
};


SykmeldingPeriode.propTypes = {
    periode: smSykmeldingPeriodePt.isRequired,
};
