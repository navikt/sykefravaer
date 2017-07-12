import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';
import {
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    lagreArbeidsoppgave,
    slettArbeidsoppgave,
    sjekkTilgang,
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import Arbeidsoppgaver from '../components/oppfolgingsdialoger/Arbeidsoppgaver';

export class ArbeidsoppgaverSide extends Component {

    constructor(props) {
        super(props);
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
    }

    componentWillMount() {
        const { oppfolgingsdialogerHentet, tilgangSjekket } = this.props;
        if (!tilgangSjekket) {
            this.props.sjekkTilgang();
        }
        if (!oppfolgingsdialogerHentet) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.lagrer && this.props.lagret) || (prevProps.sletter && this.props.slettet)) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    sendLagreArbeidsoppgave(values) {
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, values);
    }
    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(arbeidsoppgaveId);
    }

    render() {
        const { brodsmuler, ledetekster, oppfolgingsdialog, oppfolgingsdialogId, henter, hentingFeilet, lagrer, lagringFeilet, lagret, sletter, slettingFeilet, tilgang } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter || lagrer || sletter) {
                    return <AppSpinner />;
                } else if (hentingFeilet || lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                } else if (!tilgang.harTilgang) {
                    return (<OppfolgingsdialogInfoboks
                        svgUrl="/sykefravaer/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg"
                        svgAlt="ikkeTilgang"
                        tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                        tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                    />);
                }
                return (<Arbeidsoppgaver
                    oppfolgingsdialog={oppfolgingsdialog}
                    ledetekster={ledetekster}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                    sendSlettArbeidsoppgave={this.sendSlettArbeidsoppgave}
                    arbeidsoppgaveLagret={lagret}
                />);
            })()
            }
        </Side>);
    }
}

ArbeidsoppgaverSide.propTypes = {
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
    sletter: PropTypes.bool,
    slettet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    lagreArbeidsoppgave: PropTypes.func,
    slettArbeidsoppgave: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    oppfolgingsdialogerHentet: PropTypes.bool,
    tilgang: PropTypes.object,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);
    const virksomhetsnavn = oppfolgingsdialog ? oppfolgingsdialog.virksomhetsnavn : '';

    return {
        ledetekster: state.ledetekster.data,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.henter,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter  || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet,
        lagrer: state.arbeidsoppgaver.lagrer,
        lagret: state.arbeidsoppgaver.lagret,
        lagringFeilet: state.arbeidsoppgaver.lagringFeilet,
        sletter: state.arbeidsoppgaver.sletter,
        slettet: state.arbeidsoppgaver.slettet,
        slettingFeilet: state.arbeidsoppgaver.slettingFeilet,
        oppfolgingsdialog,
        oppfolgingsdialogId,
        tilgang: state.tilgang.data,
        tilgangSjekket: state.tilgang.hentet,
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

const ArbeidsoppgaverContainer = connect(mapStateToProps, { lagreArbeidsoppgave, slettArbeidsoppgave, hentOppfolgingsdialoger, sjekkTilgang })(ArbeidsoppgaverSide);

export default ArbeidsoppgaverContainer;
