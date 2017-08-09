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
    input2RSTiltak,
    erTiltaketOpprettet,
    sorterTiltakEtterOpprettet,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import Tiltak from '../components/oppfolgingsdialoger/Tiltak';

export class TiltakSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tiltak: [],
            lagretTiltak: {},
            slettetId: 0,
            visTiltakSkjema: false,
            tiltakOpprettet: false,
        };
        this.lagreTiltak = this.lagreTiltak.bind(this);
        this.slettTiltak = this.slettTiltak.bind(this);
        this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
        this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
        this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
    }

    componentDidMount() {
        this.props.sjekkTilgang();
        this.props.hentOppfolgingsdialoger();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.oppfolgingsdialogerHentet && nextProps.oppfolgingsdialogerHentet) {
            this.setState({
                tiltak: sorterTiltakEtterOpprettet(nextProps.oppfolgingsdialog.tiltakListe),
            });
        }

        if (this.props.lagrer && nextProps.lagret) {
            this.lagreTiltak(nextProps.lagretId);
        } else if (this.props.sletter && nextProps.slettet) {
            this.slettTiltak();
        }
    }

    lagreTiltak(lagretId) {
        const nyttTiltak = Object.assign({}, this.state.lagretTiltak);
        nyttTiltak.tiltakId = lagretId;
        const nyTiltakListe = [...this.state.tiltak];

        if (erTiltaketOpprettet(this.state.tiltak, nyttTiltak)) {
            const index = nyTiltakListe.findIndex((tiltak) => {
                return tiltak.tiltakId === lagretId;
            });
            nyTiltakListe[index] = nyttTiltak;
            this.setState({
                tiltak: sorterTiltakEtterOpprettet(nyTiltakListe),
                visTiltakSkjema: false,
                tiltakOpprettet: false,
            });
        } else {
            this.setState({
                tiltak: sorterTiltakEtterOpprettet(nyTiltakListe.concat([nyttTiltak])),
                visTiltakSkjema: false,
                tiltakOpprettet: true,
            });
        }
    }

    slettTiltak() {
        if (this.state.slettetId > 0) {
            const nyTiltakListe = this.state.tiltak.filter((tiltak) => {
                return tiltak.tiltakId !== this.state.slettetId;
            });
            this.setState({
                tiltak: nyTiltakListe,
                visTiltakSkjema: false,
            });
        }
    }

    sendLagreTiltak(values) {
        this.props.lagreTiltak(this.props.oppfolgingsdialogId, values);
        const tiltak = input2RSTiltak(values);
        tiltak.opprettetAvAktoerId = this.props.oppfolgingsdialog.arbeidstaker.aktoerId;
        tiltak.opprettetDato = Date.now();
        tiltak.opprettetAv = {
            aktoerId: this.props.oppfolgingsdialog.arbeidstaker.aktoerId,
            navn: this.props.oppfolgingsdialog.arbeidstaker.navn,
        };
        this.setState({
            lagretTiltak: tiltak,
        });
    }
    sendSlettTiltak(tiltakId) {
        this.props.slettTiltak(tiltakId);
        this.setState({
            slettetId: tiltakId,
        });
    }

    toggleTiltakSkjema() {
        this.setState({
            visTiltakSkjema: !this.state.visTiltakSkjema,
        });
    }

    render() {
        const {
            brodsmuler,
            ledetekster,
            oppfolgingsdialog,
            oppfolgingsdialogId,
            henter,
            hentingFeilet,
            lagrer,
            lagringFeilet,
            lagret,
            sletter,
            slettingFeilet,
            tilgang,
        } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter) {
                    return <AppSpinner />;
                } else if (hentingFeilet || lagringFeilet || slettingFeilet) {
                    return (<Feilmelding />);
                } else if (!tilgang.harTilgang) {
                    return (<OppfolgingsdialogInfoboks
                        svgUrl={`${window.APP_SETTINGS.APP_ROOT}/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg`}
                        svgAlt="ikkeTilgang"
                        tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                        tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                    />);
                }
                return (<Tiltak
                    lagrer={lagrer}
                    sletter={sletter}
                    lagringFeilet={lagringFeilet}
                    slettingFeilet={slettingFeilet}
                    oppfolgingsdialog={oppfolgingsdialog}
                    ledetekster={ledetekster}
                    tiltakListe={this.state.tiltak}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    toggleTiltakSkjema={this.toggleTiltakSkjema}
                    visTiltakSkjema={this.state.visTiltakSkjema}
                    sendLagreTiltak={this.sendLagreTiltak}
                    sendSlettTiltak={this.sendSlettTiltak}
                    tiltakLagret={lagret}
                    tiltakOpprettet={this.state.tiltakOpprettet}
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
    lagretId: PropTypes.number,
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
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet,
        lagrer: state.tiltak.lagrer,
        lagret: state.tiltak.lagret,
        lagringFeilet: state.tiltak.lagringFeilet,
        lagretId: state.tiltak.lagretId,
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
