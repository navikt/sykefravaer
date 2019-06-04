/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import { SykmeldingPerioder } from './SykmeldingPerioder';
import { BiDiagnoser, Hoveddiagnose } from './SykmeldingDiagnoser';
import { Nokkelopplysning } from './Nokkelopplysning';

const getArbeidsgivernavn = arbeidsgiver => (
    arbeidsgiver !== null ? arbeidsgiver.navn : ''
);

const getStillingsprosent = arbeidsgiver => (
    arbeidsgiver !== null && arbeidsgiver.stillingsprosent !== null
        ? `${arbeidsgiver.stillingsprosent} % stilling`
        : ''
);

export const SykmeldingOpplysninger = ({ smSykmelding }) => (
    <article>
        <div className="panel blokk dine-opplysninger">
            <h2 className="typo-innholdstittel blokk-l">{getLedetekst('din-sykmelding.tittel')}</h2>

            <div className="blokk-l side-innhold">
                <SykmeldingPerioder perioder={smSykmelding.sykmeldingsperioder} />
                <Hoveddiagnose
                    vis={!!smSykmelding.medisinskVurdering}
                    hoveddiagnose={smSykmelding.medisinskVurdering && smSykmelding.medisinskVurdering.diagnose}
                />
                <BiDiagnoser
                    vis={!!smSykmelding.medisinskVurdering}
                    biDiagnoser={smSykmelding.medisinskVurdering && smSykmelding.medisinskVurdering.biDiagnoser}
                    sykmeldingId={smSykmelding.id}
                />
                <Nokkelopplysning
                    vis={smSykmelding.arbeidsgiver !== null}
                    tittel={getLedetekst('din-sykmelding.arbeidsgiver.tittel')}
                >
                    <p className="js-arbeidsgiver">{getArbeidsgivernavn(smSykmelding.arbeidsgiver)}</p>
                    <p className="js-stillingsprosent">{getStillingsprosent(smSykmelding.arbeidsgiver)}</p>
                </Nokkelopplysning>
                <Nokkelopplysning
                    tittel={getLedetekst('din-sykmelding.avsender.tittel')}
                >
                    <p className="js-avsender">{smSykmelding.legeNavn}</p>
                </Nokkelopplysning>
            </div>
        </div>
    </article>
);

SykmeldingOpplysninger.propTypes = {
    smSykmelding: smSykmeldingPt,
};
