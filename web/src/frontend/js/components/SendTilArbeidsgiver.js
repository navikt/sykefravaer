import React, { PropTypes, Component } from 'react';
import { getLedetekst } from '../ledetekster';
import { Radiogruppe } from "../components/skjema.js";
import { DineSykmeldingerContainer } from "../containers/DineSykmeldinger.js";
import { browserHistory } from "react-router";
import Utvidbar from "./Utvidbar.js";
import SykmeldingOpplysning from "./SykmeldingOpplysning.js";

class SendTilArbeidsgiver extends Component {

	constructor(props) {
		super(props);
		this.state = {
			erFeil: false
		}
	};

	sendSykmelding() {
		if(!this.state.mottakerArbeidsgiver) {
			this.setState({
				erFeil: true
			});
		} else {
			this.props.sendSykmelding(this.props.id); 
			browserHistory.push('/dine-sykmeldinger/' + this.props.id + "/sendt");			
		}
	};

    avbrytHandler(e) {
        e.preventDefault();
        alert("Denne funksjonen har vi ikke laget enda!");
    };

	render() {
		return <div className="panel">
					<h2 className="typo-sidetittel tittel-dekorert blokk-l">{getLedetekst("sykmelding.send-til-arbeidsgiver.tittel")}</h2>

					<div className="blokk">
						<Radiogruppe
							sporsmal={getLedetekst("sykmelding.send-til-arbeidsgiver.velg-arbeidsgiver.sporsmal")}
							feilmelding={this.state.erFeil ? "Du må velge arbeidsgiver": ""}
							name="arbeidsgiver" 
							erFeil={this.state.erFeil}
							onChange={(value) => { this.setState({
							mottakerArbeidsgiver: value,
							erFeil: false
						})}}>
							<input label="BEKK" value="BEKK" />
							<input label="Rema 1000" value="Rema 1000" />
							<input label="Ingen av disse" value="INGEN">
								<form onSubmit={(e) => {
									e.preventDefault(); 
									alert("Det er dessverre ikke mulig å søke etter arbeidsgiver enda.")
								}}>
									<label htmlFor="arbeidsgiver-sok">{getLedetekst("sykmelding.send-til-arbeidsgiver.sok-etter-arbeidsgiver.label")}</label>
									<input autoComplete="off" placeholder={getLedetekst("sykmelding.send-til-arbeidsgiver.sok-etter-arbeidsgiver.placeholder")} className="input-tekst input-l input-sok" type="search" id="arbeidsgiver-sok" />
									<input type="submit" className="knapp knapp-hoved" value="Søk" />
								</form>
							</input>
						</Radiogruppe>
					</div>

					<Utvidbar tittel="Forhåndsvis arbeidsgivers versjon">
					    <SykmeldingOpplysning tittel="Når startet det legemeldte fraværet?">
					        <p>1. mai 2015</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Fornavn">
					        <p>Kari</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Etternavn">
					        <p>Nordmann</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Fødselsnummer">
					        <p>010165 11223</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Navn på pasientens fastlege">
					        <p>Per Olsen</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Pasienten har">
					        <p>Flere arbeidsforhold</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Arbeidsgiver for DENNE sykmeldingen">
					        <p>Rema 1000</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Yrke/stilling for dette arbeidsforholdet">
					        <p>Butikkmedarbeider</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Pasienten kan ikke være i arbeid">
					        <p>100 prosent sykmelding</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Pasienten er 100 prosent arbeidsfør etter denne perioden">
					        <p>Nei</p>
					    </SykmeldingOpplysning>
					    <SykmeldingOpplysning tittel="Jeg antar at pasienten kan komme tilbake til eget eller annet arbeid hos samme arbeidsgiver">
					        <p>Ja</p>
					    </SykmeldingOpplysning>
					</Utvidbar>

					<div className="blokk">
						<h3 className="skjema-sporsmal">Melding til arbeidsgiver</h3>
						<label htmlFor="melding-til-arbeidsgiver">Hva kan arbeidsgiver gjøre for at du lettere skal komme tilbake i arbeid? (valgfritt)</label>
						<textarea id="melding-til-arbeidsgiver" name="meldingTilArbeidsgiver" className="input-textarea input-fullbredde"></textarea>
					</div>

					<div className="knapperad knapperad-adskilt side-innhold">
						<p>
							<button className="knapp knapp-hoved" onClick={() => this.sendSykmelding()}>{getLedetekst("sykmelding.send-til-arbeidsgiver.send")}</button>
						</p>
						<p>
							<a href="javascript:(void)" onClick={(e) => this.avbrytHandler(e)}>{getLedetekst("sykmelding.send-til-arbeidsgiver.avbryt")}</a>
						</p>
					</div>
				</div>
	}
}

export default SendTilArbeidsgiver;