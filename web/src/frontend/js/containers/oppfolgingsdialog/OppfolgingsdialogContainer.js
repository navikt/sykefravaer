import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
    lagreTiltak,
    slettTiltak,
    sjekkTilgang,
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
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import history from '../../history';
import Side from '../../sider/Side';
import AppSpinner from '../../components/AppSpinner';
import Feilmelding from '../../components/Feilmelding';
import { getOppfolgingsdialog } from '../../utils/oppfolgingsdialogUtils';
import Oppfolgingsdialog from '../../components/oppfolgingsdialoger/Oppfolgingsdialog';
import {
    brodsmule as brodsmulePt,
} from '../../propTypes';

export class OppfolgingsdialogSide extends Component {
    componentWillMount() {
        this.props.settDialog(this.props.oppfolgingsdialogId);
    }

    componentDidMount() {
        if (!this.props.oppfolgingsdialogerHentet && !this.props.oppfolgingsdialogerHenter) {
            this.props.hentOppfolgingsdialoger();
        }
        if (!this.props.sjekkTilgangHentet && !this.props.sjekkTilgangHenter) {
            this.props.sjekkTilgang();
        }
        if (this.props.oppfolgingsdialogerHentet && !this.props.arbeidsforholdHentet && !this.props.arbeidsforholdHenter) {
            this.props.hentArbeidsforhold(this.props.oppfolgingsdialog.arbeidstaker.aktoerId, this.props.oppfolgingsdialog.oppfoelgingsdialogId, 'arbeidstaker');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.oppfolgingsdialogAvbrutt && nextProps.oppfolgingsdialogAvbrutt) {
            this.props.hentOppfolgingsdialoger();
        }
        if (this.props.oppfolgingsdialogAvbrutt && !this.props.oppfolgingsdialogerHentet && nextProps.oppfolgingsdialogerHentet) {
            const nyOpprettetDialog = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(nextProps.oppfolgingsdialoger, nextProps.oppfolgingsdialog.virksomhetsnummer);
            if (nyOpprettetDialog) {
                history.push(`${getContextRoot()}/oppfolgingsplaner/${nyOpprettetDialog.oppfoelgingsdialogId}/`);
                window.location.hash = 'arbeidsoppgaver';
            }
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
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    oppfolgingsdialog: oppfolgingProptypes.oppfolgingsdialogPt,
    oppfolgingsdialogId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    godkjenner: PropTypes.bool,
    godkjent: PropTypes.bool,
    godkjenningFeilet: PropTypes.bool,
    lagrerArbeidsoppgave: PropTypes.bool,
    lagrerTiltak: PropTypes.bool,
    lagretArbeidsoppgave: PropTypes.bool,
    lagretTiltak: PropTypes.bool,
    lagringFeiletArbeidsoppgave: PropTypes.bool,
    lagringFeiletTiltak: PropTypes.bool,
    lagretArbeidsoppgaveId: PropTypes.number,
    lagretTiltakId: PropTypes.number,
    sletterArbeidsoppgave: PropTypes.bool,
    sletterTiltak: PropTypes.bool,
    slettetArbeidsoppgave: PropTypes.bool,
    slettetTiltak: PropTypes.bool,
    slettingFeiletArbeidsoppgave: PropTypes.bool,
    slettingFeiletTiltak: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    oppfolgingsdialogerHentet: PropTypes.bool,
    oppfolgingsdialogAvbrutt: PropTypes.bool,
    hentArbeidsforhold: PropTypes.func,
    arbeidsforholdHenter: PropTypes.bool,
    arbeidsforholdHentet: PropTypes.bool,
    sjekkTilgangHentet: PropTypes.bool,
    tilgang: oppfolgingProptypes.tilgangPt,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
    hentPdfurler: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    godkjennDialog: PropTypes.func,
    avvisDialog: PropTypes.func,
    sjekkTilgangHenter: PropTypes.bool,
    settAktivtSteg: PropTypes.func,
    oppfolgingsdialogerHenter: PropTypes.bool,
    settDialog: PropTypes.func,
    avbrytDialog: PropTypes.func,
    arbeidsforhold: PropTypes.arrayOf(oppfolgingProptypes.stillingPt),
    dokument: oppfolgingProptypes.dokumentReducerPt,
    navigasjontoggles: oppfolgingProptypes.navigasjonstogglesReducerPt,
    hentet: PropTypes.bool,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);
    const virksomhetsnavn = oppfolgingsdialog ? oppfolgingsdialog.virksomhetsnavn : '';

    return {
        ledetekster: state.ledetekster.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        oppfolgingsdialogerHenter: state.oppfolgingsdialoger.henter,
        oppfolgingsdialogAvbrutt: state.avbrytdialogReducer.sendt,
        arbeidsforholdHenter: state.arbeidsforhold.henter,
        arbeidsforholdHentet: state.arbeidsforhold.hentet,
        sjekkTilgangHentet: state.tilgang.hentet,
        sjekkTilgangHenter: state.tilgang.henter,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter || state.tilgang.henter || state.arbeidsforhold.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet || state.arbeidsforhold.hentingFeilet,
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
        godkjenner: state.oppfolgingsdialoger.godkjenner,
        godkjent: state.oppfolgingsdialoger.godkjent,
        godkjenningFeilet: state.oppfolgingsdialoger.godkjenningFeilet,
        lagrerArbeidsoppgave: state.arbeidsoppgaver.lagrer,
        lagrerTiltak: state.tiltak.lagrer,
        lagretArbeidsoppgave: state.arbeidsoppgaver.lagret,
        lagretTiltak: state.tiltak.lagret,
        dokument: state.dokument,
        lagringFeiletArbeidsoppgave: state.arbeidsoppgaver.lagringFeilet,
        lagringFeiletTiltak: state.tiltak.lagringFeilet,
        lagretArbeidsoppgaveId: state.arbeidsoppgaver.lagretId,
        lagretTiltakId: state.tiltak.lagretId,
        sletterArbeidsoppgave: state.arbeidsoppgaver.sletter,
        sletterTiltak: state.tiltak.sletter,
        slettetArbeidsoppgave: state.arbeidsoppgaver.slettet,
        slettetTiltak: state.tiltak.slettet,
        slettingFeiletArbeidsoppgave: state.arbeidsoppgaver.slettingFeilet,
        slettingFeiletTiltak: state.tiltak.slettingFeilet,
        oppfolgingsdialog,
        arbeidsforhold: state.arbeidsforhold.data,
        oppfolgingsdialogId,
        tilgang: state.tilgang.data,
        tilgangSjekket: state.tilgang.hentet,
        navigasjontoggles: state.navigasjontoggles,
        hentet: state.oppfolgingsdialoger.hentet === true && state.tilgang.hentet === true,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
            erKlikkbar: true,
        }, {
            tittel: virksomhetsnavn,
        }],
    };
}

const OppfolgingsdialogContainer = connect(mapStateToProps, {
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
    lagreTiltak,
    slettTiltak,
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
})(OppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
