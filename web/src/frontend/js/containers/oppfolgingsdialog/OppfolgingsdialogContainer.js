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
    populerDialogFraState,
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
} from '../../utils/reducerUtils';
import {
    brodsmule as brodsmulePt,
} from '../../propTypes';

export class OppfolgingsdialogSide extends Component {
    componentWillMount() {
        const { toggles, tilgang, oppfolgingsdialogerReducer } = this.props;
        if (!henterEllerHarHentetToggles(toggles)) {
            this.props.hentToggles();
        }
        if (!henterEllerHarHentetTilgang(tilgang)) {
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
                history.push(`${getContextRoot()}/oppfolgingsplaner/${nyOpprettetDialog.id}`);
                window.location.hash = 'arbeidsoppgaver';
            }
        }
    }

    componentDidUpdate() {
        if (window.location.hash === '' && window.sessionStorage.getItem('hash')) {
            window.location.hash = window.sessionStorage.getItem('hash');
        }

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
            hentet,
            hentingFeilet,
            sender,
            sendingFeilet,
            tilgang,
            navigasjontoggles,
        } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler} laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}>
            { (() => {
                if (henter || sender) {
                    return <AppSpinner />;
                } else if (hentingFeilet || sendingFeilet) {
                    return (<Feilmelding />);
                } else if (!tilgang.data.harTilgang) {
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
    avbrytdialogReducer: oppfolgingProptypes.avbrytdialogReducerPt,
    arbeidsforhold: oppfolgingProptypes.arbeidsforholdReducerPt,
    arbeidsoppgaver: oppfolgingProptypes.arbeidsoppgaverReducerPt,
    dokument: oppfolgingProptypes.dokumentReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    oppfolgingsdialogerReducer: oppfolgingProptypes.oppfolgingsdialogerAtPt,
    person: oppfolgingProptypes.personReducerPt,
    tilgang: oppfolgingProptypes.tilgangReducerPt,
    tiltak: oppfolgingProptypes.tiltakReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    ledetekster: keyValue,
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    toggles: togglesPt,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    lagreKommentar: PropTypes.func,
    slettKommentar: PropTypes.func,
    hentArbeidsforhold: PropTypes.func,
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
    let oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, id);
    oppfolgingsdialog = oppfolgingsdialog && populerDialogFraState(oppfolgingsdialog, state);
    return {
        henter: state.oppfolgingsdialoger.henter
        || state.ledetekster.henter
        || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet
        || state.ledetekster.hentingFeilet
        || state.tilgang.hentingFeilet,
        hentet: state.oppfolgingsdialoger.hentet
        || state.ledetekster.hentet
        || state.tilgang.hentet
        || state.oppfolgingsdialoger.avviser
        || state.oppfolgingsdialoger.godkjent
        || state.avbrytdialogReducer.sendt
        || state.nullstill.sendt,
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
        ledetekster: state.ledetekster.data,
        arbeidsforhold: state.arbeidsforhold,
        arbeidsoppgaver: state.arbeidsoppgaver,
        avbrytdialogReducer: state.avbrytdialogReducer,
        tiltak: state.tiltak,
        delmednav: state.delmednav,
        dokument: state.dokument,
        forrigenaermesteleder: state.forrigenaermesteleder,
        kontaktinfo: state.kontaktinfo,
        naermesteleder: state.naermesteleder,
        navigasjontoggles: state.navigasjontoggles,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        person: state.person,
        tilgang: state.tilgang,
        toggles: state.toggles,
        oppfolgingsdialog,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        virksomhet: state.virksomhet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel.arbeidstaker'),
            sti: '/oppfolgingsplaner',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialog.sidetittel.arbeidstaker'),
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
