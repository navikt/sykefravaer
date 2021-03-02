import React from 'react';
import { sykmelding as sykmeldingPt, keyValue } from '../../propTypes';
import SykmeldingPerioder from './SykmeldingPerioder';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import { getSykmeldingCheckbox } from '../../utils';
import { getLedetekst } from '../../ledetekster';
import { tidligsteFom } from '../../utils/periodeUtils';

const ArbeidsgiversNokkelopplysninger = ({ sykmelding, ledetekster }) => {
    return (
        <div className="arbeidsgiversSykmelding__nokkelopplysninger">
            <SykmeldingPerioder
                perioder={sykmelding.mulighetForArbeid.perioder}
                ledetekster={ledetekster}
                Overskrift="h4" />
            {
                !sykmelding.skalViseSkravertFelt ? null : (
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('send-til-arbeidsgiver.diagnose.tittel', ledetekster)}
                        Overskrift="h4">
                        <img
                            src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/sladd.svg`}
                            className="js-diagnose"
                            alt={getLedetekst('send-til-arbeidsgiver.diagnose.skjult', ledetekster)} />
                    </SykmeldingNokkelOpplysning>
                )
            }
            {
                getSykmeldingCheckbox(sykmelding.friskmelding, 'arbeidsfoerEtterPerioden', getLedetekst('din-sykmelding.arbeidsfoer.tittel', ledetekster), 'blokk')
            }
            {
                !sykmelding.friskmelding.hensynPaaArbeidsplassen ? null : (
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('din-sykmelding.hensyn.tittel', ledetekster)}
                        Overskrift="h4">
                        <p className="js-hensynPaaArbeidsplassen">{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>
                    </SykmeldingNokkelOpplysning>
                )
            }
            {
                !sykmelding.arbeidsgiver ? null : (
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('send-til-arbeidsgiver.arbeidsgiver.tittel', ledetekster)}
                        Overskrift="h4">
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
                    </SykmeldingNokkelOpplysning>
                )
            }
            {
                !sykmelding.bekreftelse.sykmelder ? null : (
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('send-til-arbeidsgiver.sykmelder.tittel', ledetekster)}
                        Overskrift="h4">
                        <p className="js-sykmelder">{sykmelding.bekreftelse.sykmelder}</p>
                    </SykmeldingNokkelOpplysning>
                )
            }
        </div>
    );
};

ArbeidsgiversNokkelopplysninger.propTypes = {
    sykmelding: sykmeldingPt,
    ledetekster: keyValue,
};

export default ArbeidsgiversNokkelopplysninger;
