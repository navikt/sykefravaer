import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from '../../utils/datoUtils';
import { getLedetekst } from '../../ledetekster';
import Utvidbar from '../Utvidbar';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import SykmeldingPerioder from './SykmeldingPerioder';
import { SykmeldingCheckbox } from './SykmeldingCheckbox';
import FlereOpplysninger from './FlereOpplysninger';
import { getSykmeldingCheckbox } from '../../utils/dinSykmeldingUtils';

const DineSykmeldingOpplysninger = ({ sykmelding, ledetekster, Overskrift = 'H2' }) => {
    return (<div className="dine-opplysninger">
        <Overskrift className="typo-innholdstittel blokk-l">
            {getLedetekst('din-sykmelding.tittel', ledetekster)}
        </Overskrift>
        <div className="blokk-l side-innhold">
            <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder} ledetekster={ledetekster} />
            {
                sykmelding.diagnose.hoveddiagnose ? (<div className="rad-container">
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('din-sykmelding.diagnose.tittel', ledetekster)}>
                        <p className="js-hoveddiagnose">{sykmelding.diagnose.hoveddiagnose.diagnose}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('din-sykmelding.diagnosekode.tittel', ledetekster)}>
                        <p>
                            <span
                                className="js-hoveddiagnose-kode">{sykmelding.diagnose.hoveddiagnose.diagnosekode}
                            </span>
                            &nbsp;(
                                <span
                                    className="js-hoveddiagnose-system">{sykmelding.diagnose.hoveddiagnose.diagnosesystem}
                                </span>
                            )
                        </p>
                    </SykmeldingNokkelOpplysning>
                </div>) : null
            }
            {
                sykmelding.diagnose.bidiagnoser && sykmelding.diagnose.bidiagnoser.map((bidiagnose) => {
                    return (<div className="rad-container">
                        <SykmeldingNokkelOpplysning
                            tittel={getLedetekst('din-sykmelding.bidiagnose.tittel', ledetekster)}>
                            <p className="js-bidiagnose">{bidiagnose.diagnose}</p>
                        </SykmeldingNokkelOpplysning>
                        <SykmeldingNokkelOpplysning
                            tittel={getLedetekst('din-sykmelding.diagnosekode.tittel', ledetekster)}>
                            <p>
                            <span
                                className="js-bidiagnose-kode">{bidiagnose.diagnosekode}
                            </span>
                                &nbsp;(
                                <span
                                    className="js-bidiagnose-system">{bidiagnose.diagnosesystem}
                                </span>
                                )
                            </p>
                        </SykmeldingNokkelOpplysning>
                    </div>)
                })
            }
            {
                sykmelding.diagnose.fravaersgrunnLovfestet ?
                    <SykmeldingNokkelOpplysning tittel="Lovfestet fraværsgrunn">
                        <p className="js-fravaersgrunnLovfestet">{sykmelding.diagnose.fravaersgrunnLovfestet}</p>
                    </SykmeldingNokkelOpplysning> : null
            }
            {
                sykmelding.diagnose.fravaerBeskrivelse ?
                    <SykmeldingNokkelOpplysning tittel="Beskriv fraværet">
                        <p className="js-fravaerBeskrivelse">{sykmelding.diagnose.fravaerBeskrivelse}</p>
                    </SykmeldingNokkelOpplysning> : null
            }
            {
                getSykmeldingCheckbox(sykmelding.diagnose, 'svangerskap', getLedetekst('din-sykmelding.svangerskap.tittel', ledetekster), 'blokk')
            }
            {
                !sykmelding.diagnose.yrkesskadeDato ? null :
                    <SykmeldingCheckbox tekst={getLedetekst('din-sykmelding.yrkesskade.tittel', ledetekster)}
                        jsClassName="yrkesskade" />
            }
            {
                !sykmelding.diagnose.yrkesskadeDato ? null :
                    <SykmeldingNokkelOpplysning tittel="Skadedato" className="subopplysning">
                        <p className=" js-yrkesskadeDato">{toDatePrettyPrint(sykmelding.diagnose.yrkesskadeDato)}</p>
                    </SykmeldingNokkelOpplysning>
            }
            {
                getSykmeldingCheckbox(sykmelding.friskmelding, 'arbeidsfoerEtterPerioden', getLedetekst('din-sykmelding.arbeidsfoer.tittel', ledetekster), 'blokk')
            }
            {
                !sykmelding.friskmelding.hensynPaaArbeidsplassen ? null :
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('din-sykmelding.hensyn.tittel', ledetekster)}>
                        <p className="js-hensynPaaArbeidsplassen">{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>
                    </SykmeldingNokkelOpplysning>
            }
            {
                sykmelding.arbeidsgiver ? <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('din-sykmelding.arbeidsgiver.tittel', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                </SykmeldingNokkelOpplysning> : null
            }
            {
                sykmelding.bekreftelse.sykmelder ? <SykmeldingNokkelOpplysning
                    tittel={getLedetekst('din-sykmelding.avsender.tittel', ledetekster)}>
                    <p className="js-avsender">{sykmelding.bekreftelse.sykmelder}</p>
                </SykmeldingNokkelOpplysning> : null
            }
        </div>
        <Utvidbar tittel={getLedetekst('din-sykmelding.flere-opplysninger.tittel', ledetekster)}
            ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege" className="blokk-s">
            <div className="sykmeldingSeksjoner">
                <FlereOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
            </div>
        </Utvidbar>
    </div>);
};

DineSykmeldingOpplysninger.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    Overskrift: PropTypes.string,
};

export default DineSykmeldingOpplysninger;
