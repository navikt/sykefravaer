import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';
import Oppfolgingsdialog from '../components/oppfolgingsdialoger/Oppfolgingsdialog';
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
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';


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
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            tilgang,
            navigasjontoggles,
        } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter) {
                    return <AppSpinner />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                } else if (!tilgang.harTilgang) {
                    return (<OppfolgingsdialogInfoboks
                        svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg`}
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
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
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
    sjekkTilgangHentet: PropTypes.bool,
    tilgang: PropTypes.object,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
    hentPdfurler: PropTypes.func,
    nullstillGodkjenning: PropTypes.func,
    godkjennDialog: PropTypes.func,
    avvisDialog: PropTypes.func,
    sjekkTilgangHenter: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    oppfolgingsdialogerHenter: PropTypes.func,
    settDialog: PropTypes.func,
    dokument: PropTypes.object,
    navigasjontoggles: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);
    const virksomhetsnavn = oppfolgingsdialog ? oppfolgingsdialog.virksomhetsnavn : '';

    return {
        ledetekster: state.ledetekster.data,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        oppfolgingsdialogerHenter: state.oppfolgingsdialoger.henter,
        sjekkTilgangHentet: state.tilgang.hentet,
        sjekkTilgangHenter: state.tilgang.henter,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet,
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
        oppfolgingsdialogId,
        tilgang: state.tilgang.data,
        tilgangSjekket: state.tilgang.hentet,
        navigasjontoggles: state.navigasjontoggles,
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
})(OppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
