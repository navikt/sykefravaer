import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue, togglesPt } from 'digisyfo-npm';
import {
    NavigasjonsTopp,
    NavigasjonsBunn,
    AvvistPlanKvittering,
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
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import Arbeidsoppgaver from './utfylling/Arbeidsoppgaver';
import ReleasetPlanAT from './releasetplan/ReleasetPlanAT';
import IngenlederInfoboks from './IngenlederInfoboks';
import Tiltak from './utfylling/Tiltak';

const inneholderGodkjenninger = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length > 0;
};

const inneholderGodkjentPlan = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjentPlan;
};

export const erAvvistAvArbeidstaker = (oppfolgingsdialog) => {
    return oppfolgingsdialog.godkjenninger.length === 1 && !oppfolgingsdialog.godkjenninger[0].godkjent && oppfolgingsdialog.arbeidstaker.fnr === oppfolgingsdialog.godkjenninger[0].godkjentAv.fnr;
};

class Oppfolgingsdialog extends Component {
    constructor() {
        super();
        this.state = {
            visAvvisPlanKvittering: false,
            begrunnelse: null,
        };
        this.visAvvisPlanKvittering = this.visAvvisPlanKvittering.bind(this);
    }

    componentWillMount() {
        const { oppfolgingsdialog, virksomhet, person, kontaktinfo, forrigenaermesteleder, naermesteleder, hentForrigeNaermesteLeder, hentVirksomhet, hentPerson, hentNaermesteLeder, hentKontaktinfo, arbeidsforhold, hentArbeidsforhold } = this.props;
        this.props.settAktivtSteg(1);
        this.props.settDialog(oppfolgingsdialog.id);
        finnOgHentVirksomheterSomMangler([oppfolgingsdialog], virksomhet, hentVirksomhet);
        finnOgHentPersonerSomMangler([oppfolgingsdialog], person, hentPerson);
        finnOgHentForrigeNaermesteLedereSomMangler([oppfolgingsdialog], forrigenaermesteleder, hentForrigeNaermesteLeder);
        finnOgHentNaermesteLedereSomMangler([oppfolgingsdialog], naermesteleder, hentNaermesteLeder);
        finnOgHentKontaktinfoSomMangler([oppfolgingsdialog], kontaktinfo, hentKontaktinfo);
        finnOgHentArbeidsforholdSomMangler([oppfolgingsdialog], arbeidsforhold, hentArbeidsforhold);
    }

    visAvvisPlanKvittering(vis, begrunnelse) {
        this.setState({
            visAvvisPlanKvittering: vis,
            begrunnelse,
        });
    }

    render() {
        const {
            lagrerArbeidsoppgave,
            lagrerTiltak,
            lagretArbeidsoppgave,
            lagretTiltak,
            lagringFeiletArbeidsoppgave,
            lagringFeiletTiltak,
            sletterArbeidsoppgave,
            sletterTiltak,
            slettetArbeidsoppgave,
            slettetTiltak,
            slettingFeiletArbeidsoppgave,
            slettingFeiletTiltak,
            oppfolgingsdialog,
            ledetekster,
            settAktivtSteg,
            avvisDialog,
            dokument,
            godkjennDialog,
            hentPdfurler,
            giSamtykke,
            visSamtykkeSkjema,
            navigasjontoggles,
            toggleAvvisPlan,
            nullstillGodkjenning,
            avbrytDialog,
            lagreTiltak,
            slettTiltak,
            lagreArbeidsoppgave,
            slettArbeidsoppgave,
            oppfolgingsdialogAvbrutt,
            toggles,
            delMedNavFunc,
            delmednav,
            oppfolgingsdialoger,
        } = this.props;
        let panel;
        let disableNavigation = false;
        if (oppfolgingsdialog.arbeidsgiver.naermesteLeder && this.state.visAvvisPlanKvittering) {
            disableNavigation = true;
            panel = (<AvvistPlanKvittering
                ledetekster={ledetekster}
                rootUrl={`${window.APP_SETTINGS.APP_ROOT}`}
                begrunnelse={this.state.begrunnelse}
                visAvvisPlanKvittering={this.visAvvisPlanKvittering}
            />);
        } else if (oppfolgingsdialog.arbeidsgiver.naermesteLeder && visSamtykkeSkjema && oppfolgingsdialog.arbeidstaker.samtykke === null) {
            disableNavigation = true;
            panel = (<Samtykke
                sendSamtykke={giSamtykke}
                oppfolgingsdialog={oppfolgingsdialog}
                ledetekster={ledetekster}
                rootUrl={`${getContextRoot()}`}
            />);
        } else if (oppfolgingsdialog.arbeidsgiver.naermesteLeder && inneholderGodkjenninger(oppfolgingsdialog) && !erAvvistAvArbeidstaker(oppfolgingsdialog)) {
            disableNavigation = true;
            panel = (<Godkjenninger
                avvisDialog={avvisDialog}
                oppfolgingsdialog={oppfolgingsdialog}
                godkjennPlan={godkjennDialog}
                ledetekster={ledetekster}
                toggleAvvisPlan={toggleAvvisPlan}
                visAvvisPlanKvittering={this.visAvvisPlanKvittering}
                nullstillGodkjenning={nullstillGodkjenning}
                brukerType={BRUKERTYPE.ARBEIDSTAKER}
                rootUrl={`${getContextRoot()}`}
            />);
        } else if (oppfolgingsdialog.arbeidsgiver.naermesteLeder && inneholderGodkjentPlan(oppfolgingsdialog)) {
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
                oppfolgingsdialoger={oppfolgingsdialoger}
            />);
        } else {
            (() => {
                if (navigasjontoggles.steg === 1) {
                    panel = (<Arbeidsoppgaver
                        lagrer={lagrerArbeidsoppgave}
                        lagret={lagretArbeidsoppgave}
                        sletter={sletterArbeidsoppgave}
                        slettet={slettetArbeidsoppgave}
                        lagringFeilet={lagringFeiletArbeidsoppgave}
                        slettingFeilet={slettingFeiletArbeidsoppgave}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        oppfolgingsdialogAvbrutt={oppfolgingsdialogAvbrutt}
                        lagreArbeidsoppgave={lagreArbeidsoppgave}
                        slettArbeidsoppgave={slettArbeidsoppgave}
                    />);
                } else if (navigasjontoggles.steg === 2) {
                    panel = (<Tiltak
                        lagrer={lagrerTiltak}
                        lagret={lagretTiltak}
                        sletter={sletterTiltak}
                        slettet={slettetTiltak}
                        lagringFeilet={lagringFeiletTiltak}
                        slettingFeilet={slettingFeiletTiltak}
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        oppfolgingsdialogAvbrutt={oppfolgingsdialogAvbrutt}
                        lagreTiltak={lagreTiltak}
                        slettTiltak={slettTiltak}
                    />);
                } else if (oppfolgingsdialog.arbeidsgiver.naermesteLeder === null) {
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

        return (
            <div>
                { oppfolgingsdialogAvbrutt &&
                    <AvbruttGodkjentPlanVarsel
                        tekst={getLedetekst('oppfolgingdialog.avbruttGodkjentPlanVarsel.opprettet-plan')}
                        rootUrl={`${getContextRoot()}`}
                    />
                }
                <NavigasjonsTopp
                    ledetekster={ledetekster}
                    disabled={disableNavigation}
                    navn={oppfolgingsdialog.virksomhet.navn}
                    settAktivtSteg={settAktivtSteg}
                    steg={navigasjontoggles.steg}
                />
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
            </div>
        );
    }
}

Oppfolgingsdialog.propTypes = {
    lagrerArbeidsoppgave: PropTypes.bool,
    lagrerTiltak: PropTypes.bool,
    lagretArbeidsoppgave: PropTypes.bool,
    lagretTiltak: PropTypes.bool,
    lagringFeiletArbeidsoppgave: PropTypes.bool,
    lagringFeiletTiltak: PropTypes.bool,
    sletterArbeidsoppgave: PropTypes.bool,
    sletterTiltak: PropTypes.bool,
    slettetArbeidsoppgave: PropTypes.bool,
    slettetTiltak: PropTypes.bool,
    slettingFeiletArbeidsoppgave: PropTypes.bool,
    slettingFeiletTiltak: PropTypes.bool,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    ledetekster: keyValue,
    toggles: togglesPt,
    delMedNavFunc: PropTypes.func,
    delmednav: oppfolgingProptypes.delmednavPt,
    godkjennDialog: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    toggleAvvisPlan: PropTypes.func,
    hentPdfurler: PropTypes.func,
    giSamtykke: PropTypes.func,
    visSamtykkeSkjema: PropTypes.bool,
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
    oppfolgingsdialogAvbrutt: PropTypes.bool,
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    kontaktinfo: oppfolgingProptypes.kontaktinfoReducerPt,
    arbeidsforhold: oppfolgingProptypes.arbeidsforholdReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
};

export default Oppfolgingsdialog;
