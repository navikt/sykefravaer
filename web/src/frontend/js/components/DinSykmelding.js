import React, { PropTypes } from 'react';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import Utvidbar from '../components/Utvidbar.js';
import AppSpinner from './AppSpinner.js';
import { SykmeldingOpplysning, SykmeldingNokkelOpplysning } from './SykmeldingOpplysning.js';
import SykmeldingPeriode from './SykmeldingPeriode.js';
import { Link } from 'react-router';
import MulighetForArbeid from './MulighetForArbeid.js';
import Friskmelding from './Friskmelding.js';
import UtdypendeOpplysninger from './UtdypendeOpplysninger.js';
import BedreArbeidsevne from './BedreArbeidsevne.js';
import MeldingTilNAV from './MeldingTilNAV.js';
import Tilbakedatering from './Tilbakedatering.js';
import MeldingTilArbeidsgiver from './MeldingTilArbeidsgiver.js';
import AndreSykmeldingOpplysninger from './AndreSykmeldingOpplysninger.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';
import { SykmeldingCheckbox, SykmeldingCheckboxSelvstendig } from '../components/SykmeldingCheckbox.js';

const DinSykmelding = ({ sykmelding, ledetekster }) => {
    if (!sykmelding || !sykmelding.id) {
        return <AppSpinner ledetekster={ledetekster} />;
    }

    return (<div>
        <div className="header-bolk header-sykmelding">
            <img className="header-ikon" src="/sykefravaer/img/svg/account-circle.svg" alt="Du" />
            <img className="header-ikon header-ikon-hoykontrast" src="/sykefravaer/img/svg/account-circle-highcontrast.svg" alt="Du" />
            <h1 className="header-tittel">{sykmelding.fornavn} {sykmelding.etternavn}</h1>
        </div>
        <div className="panel blokk">
            <h2 className="typo-innholdstittel blokk-l">
                {getLedetekst('sykmelding.vis.hovedtittel', ledetekster)}
            </h2>
            <div className="blokk-l side-innhold">
                <div className="sykmelding-perioder">
                    {
                        sykmelding.perioder.map((periode, index) => {
                            return (<SykmeldingPeriode periode={periode} antallDager={getDuration(periode.fom, periode.tom)} />);
                        })
                    }
                </div>
                {
                    getSykmeldingOpplysning(sykmelding, "tilretteleggingArbeidsplass", "Melding til arbeidsgiver om tilrettelegging")
                }
                {
                    sykmelding.hoveddiagnose ? (<div className="diagnose-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.diagnose.tittel', ledetekster)}>
                        <p className="js-hoveddiagnose">{sykmelding.hoveddiagnose.diagnose}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.diagnosekode.tittel', ledetekster)}>
                        <p>
                            <span className="js-hoveddiagnose-kode">{sykmelding.hoveddiagnose.diagnosekode}</span>
                            &nbsp;(<span className="js-hoveddiagnose-system">{sykmelding.hoveddiagnose.diagnosesystem}</span>)
                        </p>
                    </SykmeldingNokkelOpplysning>
                </div>) : ''
                }
                {
                    sykmelding.bidiagnose ? (<div className="diagnose-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.bidiagnose.tittel', ledetekster)}>
                        <p className="js-bidiagnose">{sykmelding.bidiagnose.diagnose}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.diagnosekode.tittel', ledetekster)}>
                        <p>
                            <span className="js-bidiagnose-kode">{sykmelding.bidiagnose.diagnosekode}</span>
                            &nbsp;(<span className="js-bidiagnose-system">{sykmelding.bidiagnose.diagnosesystem}</span>)
                        </p>
                    </SykmeldingNokkelOpplysning>
                </div>) : ''
                }
                {
                    sykmelding.fravaersgrunnLovfestet ? 
                    <SykmeldingNokkelOpplysning tittel="Lovfestet fraværsgrunn">
                        <p className="js-fravaersgrunnLovfestet">{sykmelding.fravaersgrunnLovfestet}</p>
                    </SykmeldingNokkelOpplysning> : ''
                }
                {
                    sykmelding.fravaerBeskrivelse ? 
                    <SykmeldingNokkelOpplysning tittel="Beskriv fraværet">
                        <p className="js-fravaerBeskrivelse">{sykmelding.fravaerBeskrivelse}</p>
                    </SykmeldingNokkelOpplysning> : ''
                }
                {
                    getSykmeldingCheckbox(sykmelding, "svangerskap", "Sykdommen er svangerskapsrelatert", "blokk")
                }
                {
                    !sykmelding.yrkesskadeDato ? null : 
                    <SykmeldingCheckbox tekst="Sykdommen kan skyldes en skade/yrkessykdom" jsClassName="yrkesskade" />
                }
                {
                    !sykmelding.yrkesskadeDato ? null : 
                    <SykmeldingNokkelOpplysning tittel="Skadedato" className="sykmelding-subopplysning">
                        <p className="sykmelding-opplysning-verdi js-yrkesskadeDato">{formatDate(sykmelding.yrkesskadeDato)}</p>
                    </SykmeldingNokkelOpplysning>
                }
                {
                    getSykmeldingCheckbox(sykmelding, 'arbeidsfoerEtterPerioden', "Pasienten er 100 % arbeidsfør etter perioden", "blokk")
                }
                {
                    getSykmeldingOpplysning(sykmelding, "hensynPaaArbeidsplassen", "Beskriv eventuelle hensyn som må tas på arbeidsplassen")
                }
                {
                    sykmelding.arbeidsgiver ? <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.arbeidsgiver.tittel', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                </SykmeldingNokkelOpplysning> : ''    
                }
                {
                    sykmelding.sykmelder ? <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.avsender.tittel', ledetekster)}>
                    <p className="js-avsender">{sykmelding.sykmelder}</p>
                </SykmeldingNokkelOpplysning> : ''
                }
            </div>
            <Utvidbar tittel={getLedetekst('sykmelding.vis.flere-opplysninger.tittel', ledetekster)} ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege">
                <div className="sykmelding-seksjoner">
                    <MulighetForArbeid sykmelding={sykmelding} ledetekster={ledetekster} />
                    <Friskmelding sykmelding={sykmelding} ledetekster={ledetekster} />
                    <UtdypendeOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
                    <BedreArbeidsevne sykmelding={sykmelding} ledetekster={ledetekster} />
                    <MeldingTilNAV sykmelding={sykmelding} ledetekster={ledetekster} />
                    <MeldingTilArbeidsgiver sykmelding={sykmelding} ledetekster={ledetekster} />
                    <Tilbakedatering sykmelding={sykmelding} ledetekster={ledetekster} />
                    <AndreSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
                </div>
            </Utvidbar>
        </div>
        <p className="side-innhold ikke-print">
            <Link to="/sykefravaer/app">
                &lsaquo; {getLedetekst('sykmelding.vis.tilbake', ledetekster)}
            </Link>
        </p>
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default DinSykmelding;
