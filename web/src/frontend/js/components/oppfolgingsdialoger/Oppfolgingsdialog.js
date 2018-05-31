import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue, togglesPt, sykeforlopsPerioderReducerPt } from 'digisyfo-npm';
import {
    SideOverskrift,
    NavigasjonsTopp,
    NavigasjonsBunn,
    BRUKERTYPE,
    Godkjenn,
    Godkjenninger,
    Samtykke,
    AvbruttGodkjentPlanVarsel,
    finnOgHentVirksomheterSomMangler,
    finnOgHentPersonerSomMangler,
    finnOgHentKontaktinfoSomMangler,
    finnOgHentNaermesteLedereSomMangler,
    finnOgHentForrigeNaermesteLedereSomMangler,
    finnOgHentArbeidsforholdSomMangler,
    finnOgHentSykeforlopsPerioderSomMangler,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import {
    harNaermesteLeder,
    inneholderGodkjenninger,
    inneholderGodkjenningerAvArbeidstaker,
    inneholderGodkjentPlan,
    utenSamtykke,
} from '../../utils/oppfolgingsdialogUtils';
import { getContextRoot } from '../../routers/paths';
import Arbeidsoppgaver from './utfylling/Arbeidsoppgaver';
import ReleasetPlanAT from './releasetplan/ReleasetPlanAT';
import IngenlederInfoboks from './IngenlederInfoboks';
import Tiltak from './utfylling/Tiltak';


const skalViseSamtykke = (oppfolgingsdialog) => {
    return harNaermesteLeder(oppfolgingsdialog)
        && utenSamtykke(oppfolgingsdialog)
        && (inneholderGodkjentPlan(oppfolgingsdialog) || inneholderGodkjenningerAvArbeidstaker(oppfolgingsdialog));
};

export const erAvvistAvArbeidstaker = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length === 1 && !oppfolgingsdialog.godkjenninger[0].godkjent &&
        oppfolgingsdialog.arbeidstaker.fnr === oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr;
};

class Oppfolgingsdialog extends Component {
    componentWillMount() {
        const { oppfolgingsdialog, virksomhet, person, kontaktinfo, forrigenaermesteleder, naermesteleder,
            hentForrigeNaermesteLeder, hentVirksomhet, hentPerson, hentNaermesteLeder, hentKontaktinfo,
            arbeidsforhold, hentArbeidsforhold, sykeforlopsPerioderReducer, hentSykeforlopsPerioder } = this.props;
        this.props.settDialog(oppfolgingsdialog.id);
        finnOgHentVirksomheterSomMangler([oppfolgingsdialog], virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler([oppfolgingsdialog], person, hentPerson);
        finnOgHentForrigeNaermesteLedereSomMangler([oppfolgingsdialog], forrigenaermesteleder, hentForrigeNaermesteLeder);
        finnOgHentNaermesteLedereSomMangler([oppfolgingsdialog], naermesteleder, hentNaermesteLeder);
        finnOgHentKontaktinfoSomMangler([oppfolgingsdialog], kontaktinfo, hentKontaktinfo);
        finnOgHentArbeidsforholdSomMangler([oppfolgingsdialog], arbeidsforhold, hentArbeidsforhold);
        finnOgHentSykeforlopsPerioderSomMangler([oppfolgingsdialog], sykeforlopsPerioderReducer, hentSykeforlopsPerioder);
    }

    render() {
        const {
            arbeidsoppgaver,
            tiltak,
            lagreKommentar,
            slettKommentar,
            oppfolgingsdialog,
            ledetekster,
            settAktivtSteg,
            avvisDialog,
            dokument,
            godkjennDialog,
            hentPdfurler,
            giSamtykke,
            navigasjontoggles,
            nullstillGodkjenning,
            avbrytDialog,
            lagreTiltak,
            slettTiltak,
            lagreArbeidsoppgave,
            slettArbeidsoppgave,
            toggles,
            delMedNavFunc,
            delmednav,
            fastlegeDeling,
            delMedFastlege,
            oppfolgingsdialoger,
        } = this.props;
        const oppfolgingsdialogAvbrutt = this.props.avbrytdialogReducer.sendt;
        let panel;
        let disableNavigation = false;
        if (skalViseSamtykke(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Samtykke
                sendSamtykke={giSamtykke}
                oppfolgingsdialog={oppfolgingsdialog}
                ledetekster={ledetekster}
                rootUrl={`${getContextRoot()}`}
            />);
        } else if (harNaermesteLeder(oppfolgingsdialog) && inneholderGodkjenninger(oppfolgingsdialog) && !erAvvistAvArbeidstaker(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Godkjenninger
                avvisDialog={avvisDialog}
                oppfolgingsdialog={oppfolgingsdialog}
                godkjennPlan={godkjennDialog}
                ledetekster={ledetekster}
                nullstillGodkjenning={nullstillGodkjenning}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={`${getContextRoot()}`}
                rootUrlPlaner={`${getContextRoot()}`}
            />);
        } else if (harNaermesteLeder(oppfolgingsdialog) && inneholderGodkjentPlan(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<ReleasetPlanAT
                ledetekster={ledetekster}
                toggles={toggles}
                oppfolgingsdialog={oppfolgingsdialog}
                hentPdfurler={hentPdfurler}
                dokument={dokument}
                giSamtykke={giSamtykke}
                avbrytDialog={avbrytDialog}
                delMedNavFunc={delMedNavFunc}
                delmednav={delmednav}
                fastlegeDeling={fastlegeDeling}
                delMedFastlege={delMedFastlege}
                oppfolgingsdialoger={oppfolgingsdialoger}
            />);
        } else {
            (() => {
                if (navigasjontoggles.steg === 1) {
                    panel = (<Arbeidsoppgaver
                        arbeidsoppgaver={arbeidsoppgaver}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreArbeidsoppgave={lagreArbeidsoppgave}
                        slettArbeidsoppgave={slettArbeidsoppgave}
                    />);
                } else if (navigasjontoggles.steg === 2) {
                    panel = (<Tiltak
                        tiltak={tiltak}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        lagreTiltak={lagreTiltak}
                        slettTiltak={slettTiltak}
                        lagreKommentar={lagreKommentar}
                        slettKommentar={slettKommentar}
                    />);
                } else if (!harNaermesteLeder(oppfolgingsdialog)) {
                    panel = (<IngenlederInfoboks />);
                } else {
                    panel = (<Godkjenn
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        settAktivtSteg={settAktivtSteg}
                        godkjennPlan={godkjennDialog}
                        brukerType={BRUKERTYPE.ARBEIDSTAKER}
                        rootUrl={`${getContextRoot()}`}
                    />);
                }
            })();
        }

        return (<div className="oppfolgingsdialog">
            { oppfolgingsdialogAvbrutt &&
            <AvbruttGodkjentPlanVarsel
                tekst={getLedetekst('oppfolgingdialog.avbruttGodkjentPlanVarsel.opprettet-plan')}
                rootUrl={`${getContextRoot()}`}
            />
            }
            <SideOverskrift
                tittel={oppfolgingsdialog.virksomhet.navn}
            />
            { !disableNavigation && <NavigasjonsTopp
                ledetekster={ledetekster}
                disabled={disableNavigation}
                navn={oppfolgingsdialog.virksomhet.navn}
                settAktivtSteg={settAktivtSteg}
                steg={navigasjontoggles.steg}
            />
            }
            <div id="oppfolgingsdialogpanel">
                { panel }
            </div>
            <NavigasjonsBunn
                ledetekster={ledetekster}
                disabled={disableNavigation}
                settAktivtSteg={settAktivtSteg}
                steg={navigasjontoggles.steg}
                rootUrlPlaner={getContextRoot()}
            />
        </div>);
    }
}

Oppfolgingsdialog.propTypes = {
    ledetekster: keyValue,
    avbrytdialogReducer: oppfolgingProptypes.avbrytdialogReducerPt,
    arbeidsoppgaver: oppfolgingProptypes.arbeidsoppgaverReducerPt,
    tiltak: oppfolgingProptypes.tiltakReducerPt,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    kontaktinfo: oppfolgingProptypes.kontaktinfoReducerPt,
    arbeidsforhold: oppfolgingProptypes.arbeidsforholdReducerPt,
    sykeforlopsPerioderReducer: sykeforlopsPerioderReducerPt,
    fastlegeDeling: oppfolgingProptypes.delMedFastlegePt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    delmednav: oppfolgingProptypes.delmednavPt,
    toggles: togglesPt,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
    delMedFastlege: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    godkjennDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    avvisDialog: PropTypes.func,
    avbrytDialog: PropTypes.func,
    settDialog: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    hentPerson: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentArbeidsforhold: PropTypes.func,
    hentSykeforlopsPerioder: PropTypes.func,
};

export default Oppfolgingsdialog;
