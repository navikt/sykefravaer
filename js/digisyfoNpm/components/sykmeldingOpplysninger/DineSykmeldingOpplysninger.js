/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { sykmelding as sykmeldingPt, keyValue } from '../../propTypes';
import { tilLesbarDatoMedArstall, getSykmeldingCheckbox } from '../../utils';
import { getLedetekst } from '../../ledetekster';
import Utvidbar from '../Utvidbar';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import SykmeldingPerioder from './SykmeldingPerioder';
import { SykmeldingCheckbox } from './SykmeldingCheckbox';
import FlereOpplysninger from './FlereOpplysninger';
import { tidligsteFom } from '../../utils/periodeUtils';

const DineSykmeldingOpplysninger = ({ sykmelding, ledetekster, Overskrift = 'h2' }) => {
    return (
        <div className="dine-opplysninger">
            <Overskrift className="js-din-sykmelding-tittel typo-innholdstittel blokk-l">
                {
                    sykmelding.mulighetForArbeid.perioder.some((periode) => {
                        return !!periode.avventende;
                    })
                        ? 'Avventende sykmelding'
                        : getLedetekst('din-sykmelding.tittel', ledetekster)}
            </Overskrift>
            <div className="blokk-l side-innhold">
                <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder} ledetekster={ledetekster} />
                {
                    sykmelding.diagnose.hoveddiagnose ? (
                        <div className="hoveddiagnose">
                            <div className="rad-container">
                                <SykmeldingNokkelOpplysning
                                    className="nokkelopplysning--hoveddiagnose"
                                    tittel={getLedetekst('din-sykmelding.diagnose.tittel', ledetekster)}>
                                    <div>
                                        <p className="js-hoveddiagnose">{sykmelding.diagnose.hoveddiagnose.diagnose}</p>
                                        <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--mobil">{getLedetekst('din-sykmelding.diagnose.meta', ledetekster)}</p>
                                    </div>
                                </SykmeldingNokkelOpplysning>
                                <div
                                    className="nokkelopplysning nokkelopplysning--hoveddiagnose js-hoveddiagnose-kode-container">

                                    <div className="medHjelpetekst">
                                        <h3 className="nokkelopplysning__tittel">
                                            {getLedetekst('din-sykmelding.diagnosekode.tittel', ledetekster)}
                                        </h3>
                                        <Hjelpetekst>{getLedetekst('din-sykmelding.diagnosekode.hjelpetekst.tekst', ledetekster)}</Hjelpetekst>
                                    </div>
                                    <p>
                                        <span className="js-hoveddiagnose-kode">{sykmelding.diagnose.hoveddiagnose.diagnosekode}</span>
                                &nbsp;
                                        <span className="js-hoveddiagnose-system">{sykmelding.diagnose.hoveddiagnose.diagnosesystem}</span>
                                    </p>
                                </div>
                            </div>
                            <p className="js-diagnose-meta nokkelopplysning__meta nokkelopplysning__meta--desktop">{getLedetekst('din-sykmelding.diagnose.meta', ledetekster)}</p>
                        </div>
                    ) : null
                }
                {
                    sykmelding.diagnose.bidiagnoser && sykmelding.diagnose.bidiagnoser.map((bidiagnose, index) => {
                        return (
                            <div
                                className="rad-container bidiagnose"
                                key={`${sykmelding.id}-bidiagnose-${index}`}>
                                <SykmeldingNokkelOpplysning
                                    tittel={getLedetekst('din-sykmelding.bidiagnose.tittel', ledetekster)}>
                                    <p className="js-bidiagnose">{bidiagnose.diagnose}</p>
                                    <p className="js-bidiagnose-meta nokkelopplysning__meta nokkelopplysning__meta--mobil">{getLedetekst('din-sykmelding.diagnose.meta', ledetekster)}</p>
                                    <p className="js-bidiagnose-meta nokkelopplysning__meta nokkelopplysning__meta--desktop">{getLedetekst('din-sykmelding.diagnose.meta', ledetekster)}</p>
                                </SykmeldingNokkelOpplysning>
                                <SykmeldingNokkelOpplysning
                                    tittel={getLedetekst('din-sykmelding.diagnosekode.tittel', ledetekster)}>
                                    <p>
                                        <span
                                            className="js-bidiagnose-kode">
                                            {bidiagnose.diagnosekode}
                                        </span>
                                        <span className="js-bidiagnose-system">{bidiagnose.diagnosesystem}</span>
                                    </p>
                                </SykmeldingNokkelOpplysning>
                            </div>
                        );
                    })
                }
                {
                    sykmelding.diagnose.fravaersgrunnLovfestet ? (
                        <SykmeldingNokkelOpplysning
                            tittel="Lovfestet fraværsgrunn">
                            <p className="js-fravaersgrunnLovfestet">{sykmelding.diagnose.fravaersgrunnLovfestet}</p>
                        </SykmeldingNokkelOpplysning>
                    ) : null
                }
                {
                    sykmelding.diagnose.fravaerBeskrivelse ? (
                        <SykmeldingNokkelOpplysning
                            tittel="Beskriv fraværet">
                            <p className="js-fravaerBeskrivelse">{sykmelding.diagnose.fravaerBeskrivelse}</p>
                        </SykmeldingNokkelOpplysning>
                    ) : null
                }
                {
                    getSykmeldingCheckbox(sykmelding.diagnose, 'svangerskap', getLedetekst('din-sykmelding.svangerskap.tittel', ledetekster), 'blokk')
                }
                {
                    !sykmelding.diagnose.yrkesskadeDato ? null : (
                        <SykmeldingCheckbox
                            tekst={getLedetekst('din-sykmelding.yrkesskade.tittel', ledetekster)}
                            jsClassName="yrkesskade" />
                    )
                }
                {
                    !sykmelding.diagnose.yrkesskadeDato ? null : (
                        <SykmeldingNokkelOpplysning
                            tittel="Skadedato"
                            className="subopplysning">
                            <p className=" js-yrkesskadeDato">{tilLesbarDatoMedArstall(sykmelding.diagnose.yrkesskadeDato)}</p>
                        </SykmeldingNokkelOpplysning>
                    )
                }
                {
                    getSykmeldingCheckbox(sykmelding.friskmelding, 'arbeidsfoerEtterPerioden', getLedetekst('din-sykmelding.arbeidsfoer.tittel', ledetekster), 'blokk')
                }
                {
                    !sykmelding.friskmelding.hensynPaaArbeidsplassen ? null : (
                        <SykmeldingNokkelOpplysning
                            tittel={getLedetekst('din-sykmelding.hensyn.tittel', ledetekster)}>
                            <p className="js-hensynPaaArbeidsplassen">{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>
                        </SykmeldingNokkelOpplysning>
                    )
                }
                {
                    sykmelding.arbeidsgiver ? (
                        <SykmeldingNokkelOpplysning
                            tittel={getLedetekst('din-sykmelding.arbeidsgiver.tittel', ledetekster)}>
                            <div>
                                <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                                {
                                    // periode-sjekken kan fjernes etter 1.august 2018 (Når sykmeldinger med fom før 26.april uansett ikke vises)
                                    sykmelding.stillingsprosent && (tidligsteFom(sykmelding.mulighetForArbeid.perioder) >= new Date('2018-04-26'))
                                        ? (
                                            <p className="js-stillingsprosent">
                                                {getLedetekst('din-sykmelding.stillingsprosent', ledetekster, {
                                                    '%STILLINGSPROSENT%': sykmelding.stillingsprosent,
                                                })}
                                            </p>
                                        )
                                        : null
                                }
                            </div>
                        </SykmeldingNokkelOpplysning>
                    ) : null
                }
                {
                    sykmelding.bekreftelse.sykmelder ? (
                        <SykmeldingNokkelOpplysning
                            tittel={getLedetekst('din-sykmelding.avsender.tittel', ledetekster)}>
                            <p className="js-avsender">{sykmelding.bekreftelse.sykmelder}</p>
                        </SykmeldingNokkelOpplysning>
                    ) : null
                }
            </div>
            <Utvidbar
                tittel={getLedetekst('din-sykmelding.flere-opplysninger.tittel', ledetekster)}
                ikon="svg/doctor-2.svg"
                ikonHover="svg/doctor-2_hover.svg"
                ikonAltTekst="Lege"
                className="blokk-s">
                <div className="sykmeldingSeksjoner">
                    <FlereOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
                </div>
            </Utvidbar>
        </div>
    );
};

DineSykmeldingOpplysninger.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
    Overskrift: PropTypes.string,
};

export default DineSykmeldingOpplysninger;
