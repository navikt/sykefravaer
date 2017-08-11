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
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';


export class OppfolgingsdialogSide extends Component {

    componentDidMount() {
        if (!this.props.oppfolgingsdialogerHentet) {
            this.props.hentOppfolgingsdialoger();
        }
        if (!this.props.sjekkTilgangHentet) {
            this.props.sjekkTilgang();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.navigasjontoggles.steg !== nextProps.navigasjontoggles.steg) {
            this.props.hentOppfolgingsdialoger();
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
    lagrer: PropTypes.bool,
    lagret: PropTypes.bool,
    lagringFeilet: PropTypes.bool,
    lagretArbeidsoppgaveId: PropTypes.number,
    lagretTiltakId: PropTypes.number,
    sletter: PropTypes.bool,
    slettet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
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
    settAktivtSteg: PropTypes.func,
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
        sjekkTilgangHentet: state.tilgang.hentet,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet,
        lagrer: state.arbeidsoppgaver.lagrer || state.tiltak.lagrer,
        lagret: state.arbeidsoppgaver.lagret || state.tiltak.lagret,
        lagringFeilet: state.arbeidsoppgaver.lagringFeilet || state.arbeidsoppgaver.lagringFeilet,
        lagretArbeidsoppgaveId: state.arbeidsoppgaver.lagretId,
        lagretTiltakId: state.tiltak.lagretId,
        sletter: state.arbeidsoppgaver.sletter || state.tiltak.sletter,
        slettet: state.arbeidsoppgaver.slettet || state.tiltak.slettet,
        slettingFeilet: state.arbeidsoppgaver.slettingFeilet || state.tiltak.slettingFeilet,
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
})(OppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
