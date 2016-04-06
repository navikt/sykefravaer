import React, { PropTypes } from 'react';
import { formatDate, getDuration } from '../utils/index.js';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster';
import Utvidbar from '../components/Utvidbar.js';
import AppSpinner from './AppSpinner.js';
import SykmeldingOpplysning from './SykmeldingOpplysning.js';

const DinSykmelding = ({ sykmelding }) => {
	if (!sykmelding || !sykmelding.id) {
		return <AppSpinner />;
	}

	return (<div>
		<header className="side-header blokk">
			<h1 className="typo-sidetittel blokk">
				{getLedetekst('sykmelding.vis.hovedtittel')}
			</h1>
		</header>
		<div className="panel">
			<h2>{getLedetekst('sykmelding.vis.tittel')}</h2>
			<h3 className="typo-undertittel">{sykmelding.fornavn} {sykmelding.etternavn}</h3>
			<div className="blokk-l side-innhold">
				<SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.periode.tittel')}>
					<p className="js-periode"
						dangerouslySetInnerHTML={getHtmlLedetekst('sykmelding.vis.periode.tekst', {
							'%FOM%': formatDate(sykmelding.fom),
							'%TOM%': formatDate(sykmelding.tom),
							'%DAGER%': getDuration(sykmelding.fom, sykmelding.tom),
						})}></p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.arbeidsgiver.tittel')}>
					<p>{sykmelding.arbeidsgiver}</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.avsender.tittel')}>
					<p>{sykmelding.sykmelder}</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.diagnose.tittel')}>
					<p className="js-diagnose">{sykmelding.diagnose}</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.grad.tittel')}>
					<p className="js-grad">{getLedetekst('sykmelding.vis.grad.tekst', {
						"%GRAD%": sykmelding.grad
					})}</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.friskmelding.tittel')}>
					<p className="js-friskmeldt"><strong>{sykmelding.friskmeldt} %</strong> {getLedetekst('sykmelding.vis.friskmelding.tekst')}</p>
				</SykmeldingOpplysning>
			</div>
			<Utvidbar tittel={getLedetekst('sykmelding.vis.flere-opplysninger.tittel')} ikon="svg/lege.svg">
				<SykmeldingOpplysning Overskrift="H4" tittel="Når startet det legemeldte fraværet?">
					<p>1. desember 2015</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig">
					<p>Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig">
					<p>Smerter i høyre bein etter operasjon</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Pasient er 100 prosent arbeidsfør etter denne perioden">
					<p>Nei</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4"
					tittel="Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet - arbeid hos samme arbeidsgiver.">
					<p>Ja</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Når antar du at dette kan skje?">
					<p>1. april 2016</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Beskriv kort sykehistorie, symptomer og funn i dagens situasjon">
					<p>Operert for prolaps i rygg 15.12.15. Er i bedring men det går sakte.</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Hvordan påvirker sykdommen arbeidsevnen">
					<p>I svært stor grad</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Har behandlingen frem til nå bedret arbeidsevnen?">
					<p>Ja, operasjonen var vellykket, men opptrening etterpå går sakte.</p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="Beskriv pågående og planlagt henvisning, utredning og eller behandling">
					<p>Langsom opptrening, kontroll på sykehus etter operasjon. </p>
				</SykmeldingOpplysning>
				<SykmeldingOpplysning Overskrift="H4" tittel="NAV bør ta tak i saken nå">
					<p>Nei</p>
				</SykmeldingOpplysning>
			</Utvidbar>
		</div>
	</div>);
};

DinSykmelding.propTypes = {
	sykmelding: PropTypes.object,
};

export default DinSykmelding;
