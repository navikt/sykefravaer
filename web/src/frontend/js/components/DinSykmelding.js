import React, { PropTypes, Component } from 'react';
import { formatDate, getDuration } from "../utils/index.js";
import { connect } from 'react-redux';
import { getLedetekst, getHtmlLedetekst } from "../ledetekster";
import Utvidbar from "../components/Utvidbar.js";
import { Radiogruppe } from "../components/skjema.js";
import { browserHistory } from "react-router";
import SykmeldingOpplysning from "./SykmeldingOpplysning.js";

class Arbeidsgiver extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "mode": "view"
        }
    };

    enterEditMode(e) {
        e.preventDefault();
        this.setState({
            "mode": "edit"
        }, function () {
            this.refs.arbeidsgiver.focus();
            this.refs.arbeidsgiver.select(); 
        });
    };

    submitHandler(e) {
        e.preventDefault(); 
        let egenvalgtArbeidsgiver = this.refs.arbeidsgiver.value.trim();
        if(egenvalgtArbeidsgiver.toUpperCase() !== this.props.arbeidsgiver.toUpperCase().trim()) {
            this.props.setEgenvalgtArbeidsgiver(this.props.id, egenvalgtArbeidsgiver);
        } else {
            this.props.setEgenvalgtArbeidsgiver(this.props.id, null);
        }
        this.setState({
            "mode": "view"
        }, function() {
            this.refs.endreLink.focus(); 
        });
    };

    render() {

        let input; 

        return this.state.mode === "view" ? <p className="js-arbeidsgiver">{this.props.egenvalgtArbeidsgiver ? <span><del>{this.props.arbeidsgiver}</del> {this.props.egenvalgtArbeidsgiver} </span> : <span>{this.props.arbeidsgiver} </span> }<a ref="endreLink" role="button" aria-pressed={this.state.mode === "edit"}onClick={(event) => this.enterEditMode(event)} href="javascript:(void)">Endre</a></p> :
            <form onSubmit={(event) => this.submitHandler(event)}>
                <label htmlFor="egenvalgt-arbeidsgiver">Oppgi navn på arbeidsgiver</label>
                <input id="egenvalgt-arbeidsgiver" ref="arbeidsgiver"
                    type="text" className="input-text input-m input-sok" defaultValue={this.props.egenvalgtArbeidsgiver || this.props.arbeidsgiver} />
                <input type="submit" value="Lagre" className="knapp knapp-liten" />
            </form>
    }
}

class DinSykmelding extends Component {

    constructor(props) {
        super(props);
        this.state = {
            erBekreftet: false
        }
    };

    bekreftSykmelding() {
        if(this.state.opplysningeneErRiktige) {
            browserHistory.push('/dine-sykmeldinger/' + this.props.id + "/send-til-arbeidsgiver");            
        } else {
            this.setState({
                erFeil: true
            })
        }
    };

    avvisSykmelding(e) {
        e.preventDefault();
        alert("Denne funksjonen har vi ikke laget enda!");
    };

    getFeilmelding() {
        if(!this.state.erFeil) {
            return ""
        } else if(this.state.opplysningeneErRiktige === false) {
            return "Vennligst ta kontakt med din sykmelder for å få en ny sykmelding med riktige opplysninger."
        } else {
            return "Du må svare på om opplysningene i sykmeldingen er riktige"
        }
    };

	render() {

        if(!this.props.id) {
            return <p>Henter data...</p>
        }

    	return <div className="panel">
        			<header className="side-header blokk">
                        <h1 className="typo-sidetittel tittel-dekorert blokk">{getLedetekst("sykmelding.vis.tittel")}</h1>
                        <h2 className="typo-undertittel">{this.props.fornavn} {this.props.etternavn}</h2>
                    </header>
                    <div className="blokk-l side-innhold">
                        <SykmeldingOpplysning tittel={getLedetekst("sykmelding.vis.periode.tittel")}>
                            <p className="js-periode" dangerouslySetInnerHTML={getHtmlLedetekst("sykmelding.vis.periode.tekst", {
                                "%FOM%": formatDate(this.props.fom),
                                "%TOM%": formatDate(this.props.tom),
                                "%DAGER%": getDuration(this.props.fom, this.props.tom)
                            })}></p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel={getLedetekst("sykmelding.vis.arbeidsgiver.tittel")}>
                            <Arbeidsgiver {...this.props} />
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel={getLedetekst("sykmelding.vis.diagnose.tittel")}>
                            <p className="js-diagnose">{this.props.diagnose}</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel={getLedetekst("sykmelding.vis.grad.tittel")}>
                            <p className="js-grad">{this.props.grad} % sykmeldt</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel={getLedetekst("sykmelding.vis.friskmelding.tittel")}>
                            <p className="js-friskmeldt"><strong>{this.props.friskmeldt} %</strong> {getLedetekst("sykmelding.vis.friskmelding.tekst")}</p>
                        </SykmeldingOpplysning>
                    </div>
                    <Utvidbar tittel="Flere opplysninger">
                        <SykmeldingOpplysning tittel="Når startet det legemeldte fraværet?">
                            <p>1. desember 2015</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig">
                            <p>Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Beskriv årsaken til at arbeidsrelatert aktivitet ikke er mulig">
                            <p>Smerter i høyre bein etter operasjon</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Pasient er 100 prosent arbeidsfør etter denne perioden">
                            <p>Nei</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Jeg antar at pasienten på sikt kan komme tilbake til eget eller annet - arbeid hos samme arbeidsgiver.">
                            <p>Ja</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Når antar du at dette kan skje?">
                            <p>1. april 2016</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Beskriv kort sykehistorie, symptomer og funn i dagens situasjon">
                            <p>Operert for prolaps i rygg 15.12.15. Er i bedring men det går sakte.</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Hvordan påvirker sykdommen arbeidsevnen">
                            <p>I svært stor grad</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Har behandlingen frem til nå bedret arbeidsevnen?">
                            <p>Ja, operasjonen var vellykket, men opptrening etterpå går sakte.</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Beskriv pågående og planlagt henvisning, utredning og eller behandling">
                            <p>Langsom opptrening, kontroll på sykehus etter operasjon. </p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="NAV bør ta tak i saken nå">
                            <p>Nei</p>
                        </SykmeldingOpplysning>
                        <SykmeldingOpplysning tittel="Sykmelders navn">
                            <p>Ole Olsen</p>
                        </SykmeldingOpplysning>
                    </Utvidbar>

                    <div className="blokk">
                        <Radiogruppe name="arbeidsgiver" 
                            sporsmal="Er opplysningene i sykmeldingen riktige?"
                            feilmelding={this.getFeilmelding()}
                            erFeil={this.state.erFeil}
                            onChange={(value) => { console.log(value); this.setState({
                            opplysningeneErRiktige: value === "ja",
                            erFeil: false
                        })}}>
                            <input label="Ja, opplysningene er riktige" value="ja" />
                            <input label="Nei, opplysningene er ikke riktige" value="nei">
                                <div className="typo-infotekst">
                                    <h4 className="hode hode-advarsel hode-dekorert hode-undertittel">Ta kontakt med din sykmelder</h4>
                                    <p>For å få en ny sykmelding, må du ta kontakt med din sykmelder.</p>
                                </div>
                            </input>
                        </Radiogruppe>
                    </div>
                    <div className="knapperad knapperad-adskilt blokk-l side-innhold">
                        <p>
                            <button className="knapp knapp-hoved" onClick={() => this.bekreftSykmelding()}>{getLedetekst("sykmelding.vis.bekreft.tekst")}</button>
                        </p>
                        <p>
                            <a href="javascript:(void)" onClick={(e) => this.avvisSykmelding(e)}>{getLedetekst("sykmelding.vis.avvis.tekst")}</a>
                        </p>
                    </div>
                </div>
	}
}

export default DinSykmelding;