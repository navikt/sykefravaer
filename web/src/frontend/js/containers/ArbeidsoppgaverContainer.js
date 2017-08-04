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
    input2RSArbeidsoppgave,
    erArbeidsoppgavenOpprettet,
    sorterArbeidsoppgaverEtterOpprettet,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import Arbeidsoppgaver from '../components/oppfolgingsdialoger/Arbeidsoppgaver';

export class ArbeidsoppgaverSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arbeidsoppgaver: [],
            lagretArbeidsoppgave: {},
            slettetId: 0,
            visArbeidsoppgaveSkjema: false,
            arbeidsoppgaveOpprettet: false,
        };
        this.lagreArbeidsoppgave = this.lagreArbeidsoppgave.bind(this);
        this.slettArbeidsoppgave = this.slettArbeidsoppgave.bind(this);
        this.sendLagreArbeidsoppgave = this.sendLagreArbeidsoppgave.bind(this);
        this.sendSlettArbeidsoppgave = this.sendSlettArbeidsoppgave.bind(this);
        this.toggleArbeidsoppgaveSkjema = this.toggleArbeidsoppgaveSkjema.bind(this);
    }

    componentDidMount() {
        this.props.sjekkTilgang();
        this.props.hentOppfolgingsdialoger();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.oppfolgingsdialogerHentet && nextProps.oppfolgingsdialogerHentet) {
            this.setState({
                arbeidsoppgaver: sorterArbeidsoppgaverEtterOpprettet([...nextProps.oppfolgingsdialog.arbeidsoppgaveListe]),
            });
        }

        if (this.props.lagrer && nextProps.lagret) {
            this.lagreArbeidsoppgave(nextProps.lagretId);
        } else if (this.props.sletter && nextProps.slettet) {
            this.slettArbeidsoppgave();
        }
    }

    lagreArbeidsoppgave(lagretId) {
        const nyArbeidsoppgave = Object.assign({}, this.state.lagretArbeidsoppgave);
        nyArbeidsoppgave.arbeidsoppgaveId = lagretId;
        const nyArbeidsoppgaveListe = [...this.state.arbeidsoppgaver];

        if (erArbeidsoppgavenOpprettet(this.state.arbeidsoppgaver, nyArbeidsoppgave)) {
            const index = nyArbeidsoppgaveListe.findIndex((arbeidsoppgave) => {
                return arbeidsoppgave.arbeidsoppgaveId === lagretId;
            });
            nyArbeidsoppgaveListe[index] = nyArbeidsoppgave;
            this.setState({
                arbeidsoppgaver: sorterArbeidsoppgaverEtterOpprettet(nyArbeidsoppgaveListe),
                visArbeidsoppgaveSkjema: false,
                arbeidsoppgaveOpprettet: false,
            });
        } else {
            this.setState({
                arbeidsoppgaver: sorterArbeidsoppgaverEtterOpprettet(nyArbeidsoppgaveListe.concat([nyArbeidsoppgave])),
                visArbeidsoppgaveSkjema: true,
                arbeidsoppgaveOpprettet: true,
            });
        }
    }

    slettArbeidsoppgave() {
        if (this.state.slettetId > 0) {
            const nyArbeidsoppgaveListe = this.state.arbeidsoppgaver.filter((arbeidsoppgave) => {
                return arbeidsoppgave.arbeidsoppgaveId !== this.state.slettetId;
            });
            this.setState({
                arbeidsoppgaver: nyArbeidsoppgaveListe,
                visArbeidsoppgaveSkjema: false,
            });
        }
    }

    sendLagreArbeidsoppgave(values) {
        this.props.lagreArbeidsoppgave(this.props.oppfolgingsdialogId, values);
        const arbeidsoppgave = input2RSArbeidsoppgave(values);
        arbeidsoppgave.opprettetAvAktoerId = this.props.oppfolgingsdialog.sykmeldtAktoerId;
        arbeidsoppgave.opprettetAv = {
            aktoerId: this.props.oppfolgingsdialog.sykmeldtAktoerId,
            navn: this.props.oppfolgingsdialog.arbeidstakerNavn,
        };
        this.setState({
            lagretArbeidsoppgave: arbeidsoppgave,
        });
    }
    sendSlettArbeidsoppgave(arbeidsoppgaveId) {
        this.props.slettArbeidsoppgave(arbeidsoppgaveId);
        this.setState({
            slettetId: arbeidsoppgaveId,
        });
    }

    toggleArbeidsoppgaveSkjema() {
        this.setState({
            visArbeidsoppgaveSkjema: !this.state.visArbeidsoppgaveSkjema,
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
                    arbeidsoppgaveListe={this.state.arbeidsoppgaver}
                    ledetekster={ledetekster}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    toggleArbeidsoppgaveSkjema={this.toggleArbeidsoppgaveSkjema}
                    visArbeidsoppgaveSkjema={this.state.visArbeidsoppgaveSkjema}
                    sendLagreArbeidsoppgave={this.sendLagreArbeidsoppgave}
                    sendSlettArbeidsoppgave={this.sendSlettArbeidsoppgave}
                    arbeidsoppgaveLagret={lagret}
                    arbeidsoppgaveOpprettet={this.state.arbeidsoppgaveOpprettet}
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
    lagretId: PropTypes.number,
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
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter || state.tilgang.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet || state.tilgang.hentingFeilet,
        lagrer: state.arbeidsoppgaver.lagrer,
        lagret: state.arbeidsoppgaver.lagret,
        lagringFeilet: state.arbeidsoppgaver.lagringFeilet,
        lagretId: state.arbeidsoppgaver.lagretId,
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
