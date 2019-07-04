/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { smDiagnosePt } from '../../propTypes/smSykmeldingProptypes';
import { Nokkelopplysning } from './Nokkelopplysning';


export const Hoveddiagnose = ({ vis = true, hoveddiagnose = null }) => {
    if (vis) {
        return hoveddiagnose !== null
            ? (
                <div className="hoveddiagnose">
                    <div className="rad-container">
                        <Nokkelopplysning
                            tittel={getLedetekst('din-sykmelding.diagnose.tittel')}
                            className="nokkelopplysning--hoveddiagnose"
                        >
                            <div>
                                <p className="js-hoveddiagnose">{hoveddiagnose.diagnosetekst}</p>
                                <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--mobil">{getLedetekst('din-sykmelding.diagnose.meta')}</p>
                            </div>
                        </Nokkelopplysning>
                        <div
                            className="nokkelopplysning nokkelopplysning--hoveddiagnose js-hoveddiagnose-kode-container">

                            <div className="medHjelpetekst">
                                <h3 className="nokkelopplysning__tittel">
                                    {getLedetekst('din-sykmelding.diagnosekode.tittel')}
                                </h3>
                                <Hjelpetekst>{getLedetekst('din-sykmelding.diagnosekode.hjelpetekst.tekst')}</Hjelpetekst>
                            </div>
                            <p>
                                <span className="js-hoveddiagnose-kode">{hoveddiagnose.diagnosekode}</span>
                                &nbsp;
                                <span className="js-hoveddiagnose-system">{hoveddiagnose.diagnosesystem}</span>
                            </p>
                        </div>
                    </div>
                    <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--desktop">{getLedetekst('din-sykmelding.diagnose.meta')}</p>
                </div>
            )
            : (
                <div className="hoveddiagnose">
                    <div className="rad-container">
                        <Nokkelopplysning
                            tittel={getLedetekst('din-sykmelding.diagnose.tittel')}
                            className="nokkelopplysning--hoveddiagnose"
                        >
                            <div>
                                <p className="js-hoveddiagnose">Mangler diagnose</p>
                                <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--mobil">{getLedetekst('din-sykmelding.diagnose.meta')}</p>
                            </div>
                        </Nokkelopplysning>
                    </div>
                    <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--desktop">{getLedetekst('din-sykmelding.diagnose.meta')}</p>
                </div>
            );
    }
    return null;
};

Hoveddiagnose.propTypes = {
    vis: PropTypes.bool,
    hoveddiagnose: smDiagnosePt,
};

export const BiDiagnoser = ({ vis = true, biDiagnoser = [], sykmeldingId }) => (
    vis
        ? biDiagnoser.map((biDiagnose, index) => (
            <div
                className="rad-container"
                key={`${sykmeldingId}-bidiagnose-${index}`}
            >
                <Nokkelopplysning tittel={getLedetekst('din-sykmelding.bidiagnose.tittel')}>
                    <p className="js-bidiagnose">{biDiagnose.diagnosetekst}</p>
                </Nokkelopplysning>
                <Nokkelopplysning tittel={getLedetekst('din-sykmelding.diagnosekode.tittel')}>
                    <p>
                        <span className="js-bidiagnose-kode">{biDiagnose.diagnosekode}</span>
                        &nbsp;
                        <span className="js-bidiagnose-system">{biDiagnose.diagnosesystem}</span>
                    </p>
                </Nokkelopplysning>
            </div>
        ))
        : null
);

BiDiagnoser.propTypes = {
    vis: PropTypes.bool,
    biDiagnoser: PropTypes.arrayOf(smDiagnosePt),
    sykmeldingId: PropTypes.string.isRequired,
};
