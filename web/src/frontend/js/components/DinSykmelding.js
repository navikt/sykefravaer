import React, { PropTypes } from 'react';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst } from '../ledetekster';
import Utvidbar from '../components/Utvidbar.js';
import AppSpinner from './AppSpinner.js';
import SykmeldingOpplysning from './SykmeldingOpplysning.js';
import { Link } from 'react-router';

const getSykmeldingOpplysning = (sykmelding, felt, tittel, opplysning) => {
    if (sykmelding[felt]) {
        return (<SykmeldingOpplysning tittel={tittel} Overskrift="H4">
            <p className={'js-' + felt}>{opplysning || sykmelding[felt]}</p>
        </SykmeldingOpplysning>);
    }
    return '';
};

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
                            return (<SykmeldingOpplysning key={index} tittel="Periode">
                                <div>
                                    <p className="js-periode blokk-xxs">
                                        <strong>{formatDate(periode.fom)} &ndash; {formatDate(periode.tom)}</strong> &bull; {getDuration(periode.fom, periode.tom)} dager
                                    </p>
                                    <p className="js-grad">
                                        {periode.grad} % sykmeldt
                                    </p>
                                </div>
                            </SykmeldingOpplysning>);
                        })
                    }
                </div>
                <div className="diagnose-container">
                    <SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.diagnose.tittel', ledetekster)}>
                        <p className="js-hoveddiagnose">{sykmelding.hoveddiagnose.diagnose}</p>
                    </SykmeldingOpplysning>
                    <SykmeldingOpplysning tittel="Diagnosekode">
                        <p><span className="js-hoveddiagnose-kode">{sykmelding.hoveddiagnose.diagnosekode}</span> (<span className="js-hoveddiagnose-system">{sykmelding.hoveddiagnose.diagnosesystem}</span>)</p>
                    </SykmeldingOpplysning>
                </div>
                {
                    sykmelding.bidiagnose ? (<div className="diagnose-container">
                    <SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.diagnose.tittel', ledetekster)}>
                        <p className="js-bidiagnose">{sykmelding.bidiagnose.diagnose}</p>
                    </SykmeldingOpplysning>
                    <SykmeldingOpplysning tittel="Diagnosekode">
                        <p><span className="js-bidiagnose-kode">{sykmelding.bidiagnose.diagnosekode}</span> (<span className="js-bidiagnose-system">{sykmelding.bidiagnose.diagnosesystem}</span>)</p>
                    </SykmeldingOpplysning>
                </div>) : ''
                }
                {
                    sykmelding.arbeidfoerEtterPerioden ? (<SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.friskmelding.tittel', ledetekster)}>
                    <p className="js-friskmeldt">{getLedetekst('sykmelding.vis.friskmelding.tekst', ledetekster)}</p>
                </SykmeldingOpplysning>) : ''
                }
                <SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.arbeidsgiver.tittel', ledetekster)}>
                    <p className="js-arbeidsgiver">{sykmelding.arbeidsgiver}</p>
                </SykmeldingOpplysning>
                <SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.avsender.tittel', ledetekster)}>
                    <p className="js-avsender">{sykmelding.sykmelder}</p>
                </SykmeldingOpplysning>
            </div>
            <Utvidbar tittel={getLedetekst('sykmelding.vis.flere-opplysninger.tittel', ledetekster)} ikon="svg/doctor-2.svg" ikonHover="svg/doctor-2_hover.svg" ikonAltTekst="Lege">
                {
                    getSykmeldingOpplysning(sykmelding, 'startLegemeldtFravaer', 'Når startet det legemeldte fraværet?', formatDate(sykmelding.startLegemeldtFravaer))
                }
                <SykmeldingOpplysning Overskrift="H4" tittel="Pasient er 100 prosent arbeidsfør etter denne perioden">
                    <p className="js-antarReturTilArbeid">{sykmelding.antarReturTilArbeid ? 'Ja' : 'Nei'}</p>
                </SykmeldingOpplysning>
                <SykmeldingOpplysning Overskrift="H4" tittel="Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet - arbeid hos samme arbeidsgiver.">
                    <p className="js-arbeidfoerEtterPerioden">{sykmelding.arbeidfoerEtterPerioden ? 'Ja' : 'Nei'}</p>
                </SykmeldingOpplysning>
                {
                    getSykmeldingOpplysning(sykmelding, 'antattDatoReturTilArbeid', 'Når antar du dette kan skje?', formatDate(sykmelding.antattDatoReturTilArbeid))
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'sykehistorie', 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon')
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig433', 'Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig')
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig434', 'Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig')
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'navboerTaTakISaken', 'NAV bør ta tak i saken nå', 'Ja')
                }
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
