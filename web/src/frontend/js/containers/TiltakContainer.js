import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';
import {
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    lagreTiltak,
    slettTiltak,
    sjekkTilgang,
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import Tiltak from '../components/oppfolgingsdialoger/Tiltak';

export class TiltakSide extends Component {

    constructor(props) {
        super(props);
        this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
        this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
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

    sendLagreTiltak(values) {
        this.props.lagreTiltak(this.props.oppfolgingsdialogId, values);
    }
    sendSlettTiltak(tiltakId) {
        this.props.slettTiltak(tiltakId);
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
                return (<Tiltak
                    oppfolgingsdialog={oppfolgingsdialog}
                    ledetekster={ledetekster}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    sendLagreTiltak={this.sendLagreTiltak}
                    sendSlettTiltak={this.sendSlettTiltak}
                    tiltakLagret={lagret}
                />);
            })()
            }
        </Side>);
    }
}

TiltakSide.propTypes = {
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
    lagreTiltak: PropTypes.func,
    slettTiltak: PropTypes.func,
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
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet,
        lagrer: state.tiltak.lagrer,
        lagret: state.tiltak.lagret,
        lagringFeilet: state.tiltak.lagringFeilet,
        sletter: state.tiltak.sletter,
        slettet: state.tiltak.slettet,
        slettingFeilet: state.tiltak.slettingFeilet,
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

const TiltakContainer = connect(mapStateToProps, { lagreTiltak, slettTiltak, hentOppfolgingsdialoger, sjekkTilgang })(TiltakSide);

export default TiltakContainer;
