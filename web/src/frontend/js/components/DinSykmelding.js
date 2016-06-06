import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import Utvidbar from '../components/Utvidbar.js';
import AppSpinner from './AppSpinner.js';
import { SykmeldingNokkelOpplysning } from './SykmeldingOpplysning.js';
import SykmeldingPerioder from './SykmeldingPerioder.js';
import { Link } from 'react-router';
import { getSykmeldingCheckbox } from '../utils/dinSykmeldingUtils.js';
import { SykmeldingCheckbox } from '../components/SykmeldingCheckbox.js';
import FlereOpplysninger from './FlereOpplysninger.js';
import Hjelpetekst from '../components/Hjelpetekst.js';
import DinSykmeldingBrukerInputContainer from '../containers/DinSykmeldingBrukerInputContainer.js';
import arbeidssituasjoner from '../arbeidssituasjonData';

const DinSykmelding = ({ sykmelding, ledetekster, strengtFortroligAdresse = false }) => {
    if (!sykmelding || !sykmelding.id) {
        return <AppSpinner ledetekster={ledetekster} />;
    }

    return (<div>
        <div className="header-bolk header-sykmelding">
            <img className="header-ikon" src="/sykefravaer/img/svg/account-circle.svg" alt="Du" />
            <img className="header-ikon header-ikon-hoykontrast"
                src="/sykefravaer/img/svg/account-circle-highcontrast.svg" alt="Du" />
            <h1 className="header-tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h1>
        </div>
        <div className="panel blokk">
            <h2 className="typo-innholdstittel blokk-l">
                {getLedetekst('din-sykmelding.hovedtittel', ledetekster)}
            </h2>
            <div className="blokk-l side-innhold">
                <SykmeldingPerioder perioder={sykmelding.mulighetForArbeid.perioder} ledetekster={ledetekster} />
                {
                    sykmelding.diagnose.hoveddiagnose ? (<div className="diagnose-container">
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
                    sykmelding.diagnose.bidiagnose ? (<div className="diagnose-container">
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
                    </div>) : null
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
                        <SykmeldingNokkelOpplysning tittel="Skadedato" className="sykmelding-subopplysning">
                            <p className=" js-yrkesskadeDato">{formatDate(sykmelding.diagnose.yrkesskadeDato)}</p>
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
                ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege">
                <div className="sykmelding-seksjoner">
                    <FlereOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
                </div>
            </Utvidbar>
                <div className="hjelpetekst-parent hjelpetekst-parent-inline">
                    <h3 className="skjema-sporsmal med-hjelpetekst">{getLedetekst('din-sykmelding.arbeidssituasjon.tittel', ledetekster)}</h3>
                    <Hjelpetekst
                        id="velg-arbeidssituasjon-hjelpetekst"
                        tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tittel', ledetekster)}
                        tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tekst', ledetekster)} />
                </div>
                {
                    strengtFortroligAdresse ? null :
                        <DinSykmeldingBrukerInputContainer sykmelding={sykmelding}
                            arbeidssituasjoner={arbeidssituasjoner} />
                }
        </div>
        <p className="side-innhold ikke-print">
            <Link to="/sykefravaer/app/sykmeldinger">
                &lsaquo; {getLedetekst('din-sykmelding.tilbake', ledetekster)}
            </Link>
        </p>
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    strengtFortroligAdresse: PropTypes.bool,
};

export default DinSykmelding;
