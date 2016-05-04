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
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const DinSykmelding = ({ sykmelding, ledetekster }) => {
    if (!sykmelding || !sykmelding.id) {
        return <AppSpinner ledetekster={ledetekster} />;
    }

    return (<div>
        <div className="header-bolk header-sykmelding">
            <img className="header-ikon" src="/sykefravaer/img/svg/account-circle.svg" alt="Du" />
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
                    sykmelding.hoveddiagnose ? (<div className="diagnose-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.diagnose.tittel', ledetekster)}>
                        <p className="js-hoveddiagnose">{sykmelding.hoveddiagnose.diagnose}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel="Diagnosekode">
                        <p>
                            <span className="js-hoveddiagnose-kode">{sykmelding.hoveddiagnose.diagnosekode}</span> 
                            (<span className="js-hoveddiagnose-system">{sykmelding.hoveddiagnose.diagnosesystem}</span>)
                        </p>
                    </SykmeldingNokkelOpplysning>
                </div>) : ''
                }
                {
                    sykmelding.bidiagnose ? (<div className="diagnose-container">
                    <SykmeldingNokkelOpplysning tittel={getLedetekst('sykmelding.vis.diagnose.tittel', ledetekster)}>
                        <p className="js-bidiagnose">{sykmelding.bidiagnose.diagnose}</p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning tittel="Diagnosekode">
                        <p>
                            <span className="js-bidiagnose-kode">{sykmelding.bidiagnose.diagnosekode}</span>
                            (<span className="js-bidiagnose-system">{sykmelding.bidiagnose.diagnosesystem}</span>)
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
                    getSykmeldingCheckbox(sykmelding, "svangerskap", "Sykdommen er svangerskapsrelatert")
                }
                {
                    sykmelding.yrkesskadeDato ? <div>
                    {getSykmeldingCheckbox(sykmelding, 'yrkesskadeDato', 'Sykdommen kan skyldes en skade/yrkessykdom', 'yrkesskade')}
                    <SykmeldingNokkelOpplysning tittel="Skadedato" className="sykmelding-subopplysning">
                        <p className="js-yrkesskadeDato">{formatDate(sykmelding.yrkesskadeDato)}</p>
                    </SykmeldingNokkelOpplysning>
                    </div> : ''
                }
                {
                    getSykmeldingCheckbox(sykmelding, 'arbeidfoerEtterPerioden', getLedetekst('sykmelding.vis.arbeidsfoer.tekst', ledetekster))
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
                <MulighetForArbeid sykmelding={sykmelding} ledetekster={ledetekster} />
                <Friskmelding sykmelding={sykmelding} ledetekster={ledetekster} />
                <UtdypendeOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />)
                <BedreArbeidsevne sykmelding={sykmelding} ledetekster={ledetekster} />
                <MeldingTilNAV sykmelding={sykmelding} ledetekster={ledetekster} />
                <Tilbakedatering sykmelding={sykmelding} ledetekster={ledetekster} />
                <h4 className="sykmelding-seksjonstittel">Melding til arbeidsgiver</h4>
                //Todo: Innspill til arbeidsgiver
                <h4 className="sykmelding-seksjonstittel">Tilbakedatering</h4>
                //Todo: Hvis denne sykmeldingen er tilbakedatert, oppgi dato for dokumenterbar kontakt med pasienten
                //Todo: Eller begrunn hvorfor du har tilbakedatert
                {
                    getSykmeldingOpplysning(sykmelding, 'sykmelderTlf', 'Telefonnummer til lege/sykmelder')
                }
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
