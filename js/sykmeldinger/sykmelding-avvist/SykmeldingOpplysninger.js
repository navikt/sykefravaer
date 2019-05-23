/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import PT from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import { SykmeldingPerioder } from './SykmeldingPerioder';

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
