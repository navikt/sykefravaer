import React, { PropTypes } from 'react';
import { toDatePrettyPrint } from '../utils/datoUtils';
import { getLedetekst } from '../ledetekster/index';
import Utvidbar from '../components/Utvidbar';
import AppSpinner from './AppSpinner';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning';
import SykmeldingPerioder from './SykmeldingPerioder';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';
import { Link } from 'react-router';
import { getSykmeldingCheckbox } from '../utils/dinSykmeldingUtils';
import { SykmeldingCheckbox } from '../components/SykmeldingCheckbox';
import FlereOpplysninger from './FlereOpplysninger';
import KvitteringPanel from './KvitteringPanel';
import DinSykmeldingBrukerInputContainer from '../containers/DinSykmeldingBrukerInputContainer';
import arbeidssituasjoner from '../arbeidssituasjonData';

const DinSykmelding = ({ sykmelding, ledetekster, visSendTilArbeidsgiver = false }) => {
    if (!sykmelding || !sykmelding.id) {
        return <AppSpinner ledetekster={ledetekster} />;
    }
    return (<div>

        <KvitteringPanel ledetekster={ledetekster} sykmelding={sykmelding} />

        <div className="header-bolk header-sykmelding">
            <img className="header-ikon" src="/sykefravaer/img/svg/account-circle.svg" alt="Du" />
            <img className="header-ikon header-ikon-hoykontrast"
                src="/sykefravaer/img/svg/account-circle-highcontrast.svg" alt="Du" />
            <h1 className="header-tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h1>
        </div>
        <div className="panel blokk">
            <h2 className="typo-innholdstittel blokk-l">
                {getLedetekst('din-sykmelding.sidetittel', ledetekster)}
            </h2>
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
                    </div>) : <noscript />
                }
                {
                    sykmelding.diagnose.bidiagnose ? (<div className="rad-container">
                        <SykmeldingNokkelOpplysning
                            tittel={getLedetekst('din-sykmelding.bidiagnose.tittel', ledetekster)}>
                            <p className="js-bidiagnose">{sykmelding.diagnose.bidiagnose.diagnose}</p>
                        </SykmeldingNokkelOpplysning>
                        <SykmeldingNokkelOpplysning
                            tittel={getLedetekst('din-sykmelding.diagnosekode.tittel', ledetekster)}>
                            <p>
                                <span
                                    className="js-bidiagnose-kode">{sykmelding.diagnose.bidiagnose.diagnosekode}
                                </span>
                                &nbsp;(
                                    <span
                                        className="js-bidiagnose-system">{sykmelding.diagnose.bidiagnose.diagnosesystem}
                                    </span>
                                )
                            </p>
                        </SykmeldingNokkelOpplysning>
                    </div>) : <noscript />
                }
                {
                    sykmelding.diagnose.fravaersgrunnLovfestet ?
                        <SykmeldingNokkelOpplysning tittel="Lovfestet fraværsgrunn">
                            <p className="js-fravaersgrunnLovfestet">{sykmelding.diagnose.fravaersgrunnLovfestet}</p>
                        </SykmeldingNokkelOpplysning> : <noscript />
                }
                {
                    sykmelding.diagnose.fravaerBeskrivelse ?
                        <SykmeldingNokkelOpplysning tittel="Beskriv fraværet">
                            <p className="js-fravaerBeskrivelse">{sykmelding.diagnose.fravaerBeskrivelse}</p>
                        </SykmeldingNokkelOpplysning> : <noscript />
                }
                {
                    getSykmeldingCheckbox(sykmelding.diagnose, 'svangerskap', getLedetekst('din-sykmelding.svangerskap.tittel', ledetekster), 'blokk')
                }
                {
                    !sykmelding.diagnose.yrkesskadeDato ? <noscript /> :
                        <SykmeldingCheckbox tekst={getLedetekst('din-sykmelding.yrkesskade.tittel', ledetekster)}
                            jsClassName="yrkesskade" />
                }
                {
                    !sykmelding.diagnose.yrkesskadeDato ? <noscript /> :
                        <SykmeldingNokkelOpplysning tittel="Skadedato" className="sykmelding-subopplysning">
                            <p className=" js-yrkesskadeDato">{toDatePrettyPrint(sykmelding.diagnose.yrkesskadeDato)}</p>
                        </SykmeldingNokkelOpplysning>
                }
                {
                    getSykmeldingCheckbox(sykmelding.friskmelding, 'arbeidsfoerEtterPerioden', getLedetekst('din-sykmelding.arbeidsfoer.tittel', ledetekster), 'blokk')
                }
                {
                    !sykmelding.friskmelding.hensynPaaArbeidsplassen ? <noscript /> :
                        <SykmeldingNokkelOpplysning tittel={getLedetekst('din-sykmelding.hensyn.tittel', ledetekster)}>
                            <p className="js-hensynPaaArbeidsplassen">{sykmelding.friskmelding.hensynPaaArbeidsplassen}</p>
                        </SykmeldingNokkelOpplysning>
                }
                {
                    sykmelding.arbeidsgiver ? <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('din-sykmelding.arbeidsgiver.tittel', ledetekster)}>
                        <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                    </SykmeldingNokkelOpplysning> : <noscript />
                }
                {
                    sykmelding.bekreftelse.sykmelder ? <SykmeldingNokkelOpplysning
                        tittel={getLedetekst('din-sykmelding.avsender.tittel', ledetekster)}>
                        <p className="js-avsender">{sykmelding.bekreftelse.sykmelder}</p>
                    </SykmeldingNokkelOpplysning> : <noscript />
                }
            </div>
            <Utvidbar tittel={getLedetekst('din-sykmelding.flere-opplysninger.tittel', ledetekster)}
                ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege">
                <div className="sykmelding-seksjoner">
                    <FlereOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
                </div>
            </Utvidbar>
                {
                    (visSendTilArbeidsgiver) ?
                        <DinSykmeldingBrukerInputContainer sykmelding={sykmelding} arbeidssituasjoner={arbeidssituasjoner} /> : <noscript />
                }
        </div>

        <ArbeidsgiversSykmelding sykmelding={sykmelding} ledetekster={ledetekster} />

        <p className="side-innhold ikke-print">
            <Link to="/sykefravaer/sykmeldinger">
                &lsaquo; {getLedetekst('din-sykmelding.tilbake', ledetekster)}
            </Link>
        </p>
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    visSendTilArbeidsgiver: PropTypes.bool,
};

export default DinSykmelding;
