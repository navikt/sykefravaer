import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, keyValue, hentToggles, togglesPt } from 'digisyfo-npm';
import {
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
    lagreTiltak,
    slettTiltak,
    sjekkTilgang,
    lagreKommentar,
    slettKommentar,
    godkjennDialogAt as godkjennDialog,
    avvisDialogAt as avvisDialog,
    nullstillGodkjenning,
    settAktivtSteg,
    hentPdfurler,
    giSamtykke,
    visSamtykke,
    OppfolgingsdialogInfoboks,
    settDialog,
    avbrytDialog,
    finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt,
    hentArbeidsforhold,
    hentVirksomhet,
    hentPerson,
    hentKontaktinfo,
    hentForrigeNaermesteLeder,
    hentNaermesteLeder,
    delMedNav as delMedNavFunc,
    proptypes as oppfolgingProptypes,
    henterEllerHarHentetTilgang,
    henterEllerHarHentetOppfolgingsdialoger,
    oppfolgingsdialogHarBlittAvbrutt,
    oppfolgingsdialogHarBlittGodkjent,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import history from '../../history';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { getOppfolgingsdialog } from '../../utils/oppfolgingsdialogUtils';
import Oppfolgingsdialog from '../../components/oppfolgingsdialoger/Oppfolgingsdialog';
import {
    henterEllerHarHentetToggles,
    hentetEllerHentingFeilet,
} from '../../utils/reducerUtils';
import {
    brodsmule as brodsmulePt,
} from '../../propTypes';

export class OppfolgingsdialogSide extends Component {
    componentWillMount() {
        const { toggles, tilgangReducer, oppfolgingsdialogerReducer } = this.props;
        if (!henterEllerHarHentetToggles(toggles)) {
            this.props.hentToggles();
        }
        if (!henterEllerHarHentetTilgang(tilgangReducer)) {
            this.props.sjekkTilgang();
        }
        if (!henterEllerHarHentetOppfolgingsdialoger(oppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { oppfolgingsdialogerReducer, avbrytdialogReducer } = this.props;
        if (oppfolgingsdialogHarBlittAvbrutt(avbrytdialogReducer, nextProps.avbrytdialogReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
        if (avbrytdialogReducer.sendt && oppfolgingsdialogerReducer.henter && nextProps.oppfolgingsdialogerReducer.hentet) {
            const nyOpprettetDialog = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(nextProps.oppfolgingsdialoger, nextProps.oppfolgingsdialog.virksomhet.virksomhetsnummer);
            if (nyOpprettetDialog) {
                history.push(`${getContextRoot()}/oppfolgingsplaner/${nyOpprettetDialog.id}/`);
                window.location.hash = 'arbeidsoppgaver';
            }
        }
        if (oppfolgingsdialogHarBlittGodkjent(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
            this.props.visSamtykke(true);
        }
    }

    componentDidUpdate() {
        if (window.location.hash === '#arbeidsoppgaver' && this.props.navigasjontoggles.steg !== 1) {
            this.props.settAktivtSteg(1);
        }

        if (window.location.hash === '#tiltak' && this.props.navigasjontoggles.steg !== 2) {
            this.props.settAktivtSteg(2);
        }

        if (window.location.hash === '#godkjenn' && this.props.navigasjontoggles.steg !== 3) {
            this.props.settAktivtSteg(3);
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            sender,
            sendingFeilet,
            tilgang,
            navigasjontoggles,
            hentet,
        } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler} laster={henter || sender || !hentet}>
            { (() => {
                if (henter || sender) {
                    return <AppSpinner />;
                } else if (hentingFeilet || sendingFeilet) {
                    return (<Feilmelding />);
                } else if (!tilgang.harTilgang) {
                    return (<OppfolgingsdialogInfoboks
                        svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg`}
                        svgAlt="ikkeTilgang"
                        tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                        tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                    />);
                }
                return (
                    <Oppfolgingsdialog {...this.props} steg={navigasjontoggles.steg} />
                );
            })()
            }
        </Side>);
    }
}

OppfolgingsdialogSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: keyValue,
    toggles: togglesPt,
    tilgangReducer: oppfolgingProptypes.tilgangReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    oppfolgingsdialogerReducer: oppfolgingProptypes.oppfolgingsdialogerAtPt,
    avbrytdialogReducer: oppfolgingProptypes.avbrytdialogReducerPt,
    arbeidsforhold: oppfolgingProptypes.arbeidsforholdReducerPt,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    visSamtykke: PropTypes.func,
    visSamtykkeSkjema: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
    hentArbeidsforhold: PropTypes.func,
    tilgang: oppfolgingProptypes.tilgangPt,
    sjekkTilgang: PropTypes.func,
    hentPdfurler: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    delMedNav: PropTypes.func,
    godkjennDialog: PropTypes.func,
    avvisDialog: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    avbrytDialog: PropTypes.func,
    settDialog: PropTypes.func,
    hentToggles: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentKontaktinfo: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const id = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, id);
    const brodsmuletittel = oppfolgingsdialog && oppfolgingsdialog.virksomhet.navn;
    return {
        naermesteleder: state.naermesteleder,
        forrigenaermesteleder: state.forrigenaermesteleder,
        virksomhet: state.virksomhet,
        kontaktinfo: state.kontaktinfo,
        arbeidsforhold: state.arbeidsforhold,
        person: state.person,
        ledetekster: state.ledetekster.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        avbrytdialogReducer: state.avbrytdialogReducer,
        arbeidsoppgaverReducer: state.arbeidsoppgaver,
        tiltakReducer: state.tiltak,
        henter: state.oppfolgingsdialoger.henter
        || state.ledetekster.henter
        || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet
        || state.ledetekster.hentingFeilet
        || state.tilgang.hentingFeilet,
        hentet: hentetEllerHentingFeilet([
            state.tilgang,
            state.oppfolgingsdialoger]),
        sender: state.oppfolgingsdialoger.avviser
        || state.oppfolgingsdialoger.godkjenner
        || state.avbrytdialogReducer.sender
        || state.nullstill.sender
        || state.samtykke.sender,
        sendingFeilet: state.oppfolgingsdialoger.avvisFeilet
        || state.oppfolgingsdialoger.godkjenningFeilet
        || state.avbrytdialogReducer.sendingFeilet
        || state.nullstill.sendingFeilet
        || state.samtykke.sendingFeilet,
        visSamtykkeSkjema: state.samtykke.vis,
        dokument: state.dokument,
        lagringFeiletArbeidsoppgave: state.arbeidsoppgaver.lagringFeilet,
        lagringFeiletTiltak: state.tiltak.lagringFeilet,
        toggles: state.toggles,
        oppfolgingsdialog,
        tilgang: state.tilgang.data,
        tilgangReducer: state.tilgang,
        navigasjontoggles: state.navigasjontoggles,
        delmednav: state.delmednav,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
            erKlikkbar: true,
        }, {
            tittel: brodsmuletittel,
        }],
    };
}

const OppfolgingsdialogContainer = connect(mapStateToProps, {
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
    lagreTiltak,
    slettTiltak,
    lagreKommentar,
    slettKommentar,
    hentOppfolgingsdialoger,
    sjekkTilgang,
    godkjennDialog,
    avvisDialog,
    nullstillGodkjenning,
    settAktivtSteg,
    hentPdfurler,
    giSamtykke,
    visSamtykke,
    settDialog,
    hentArbeidsforhold,
    avbrytDialog,
    hentToggles,
    hentVirksomhet,
    hentPerson,
    hentKontaktinfo,
    hentForrigeNaermesteLeder,
    hentNaermesteLeder,
    delMedNavFunc,
})(OppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
