import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import Sidetopp from '../components/Sidetopp';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import history from '../history';
import { brodsmule as brodsmulePt } from '../propTypes';
import OpprettOppfolgingsdialog from '../components/oppfolgingsdialoger/OpprettOppfolgingsdialog';
import { hentDineSykmeldinger } from '../actions/dineSykmeldinger_actions';
import { hentLedere } from '../actions/ledere_actions';
import {
    OppfolgingsdialogInfoboks,
    opprettOppfolgingsdialogAt as opprettOppfolgingsdialog,
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    sjekkTilgang,
} from 'oppfolgingsdialog-npm';

export class OpprettOppfolgingsdialogSide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arbeidsgiver: '',
        };
        this.opprett = this.opprett.bind(this);
    }

    componentWillMount() {
        const { tilgangSjekket, sykmeldingerHentet, ledereHentet, oppfolgingsdialogerHentet } = this.props;
        if (!tilgangSjekket) {
            this.props.sjekkTilgang();
        }
        if (!sykmeldingerHentet) {
            this.props.hentDineSykmeldinger();
        }
        if (!ledereHentet) {
            this.props.hentLedere();
        }
        if (!oppfolgingsdialogerHentet) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.oppretter && this.props.opprettet) {
            history.push(`/sykefravaer/oppfolgingsplaner/${this.props.opprettetId}/arbeidsoppgaver`);
            this.props.hentOppfolgingsdialoger();
        }
    }

    handleOptionChange(e) {
        this.setState({
            arbeidsgiver: e.target.value,
        });
    }

    nesteSide() {
        this.setState({
            side: this.state.side + 1,
        });
    }
    opprett(values) {
        this.props.opprettOppfolgingsdialog(values.arbeidsgiver);
    }

    render() {
        const { brodsmuler, sykmeldinger, naermesteLedere, oppfolgingsdialoger, henter, hentingFeilet, oppretter, opprettingFeilet, tilgang } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter || oppretter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || opprettingFeilet) {
                        return (<Feilmelding />);
                    } else if (!tilgang.harTilgang) {
                        return (<OppfolgingsdialogInfoboks
                            svgUrl="/sykefravaer/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg"
                            svgAlt="ikkeTilgang"
                            tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                            tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                        />);
                    }
                    return (
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OpprettOppfolgingsdialog
                                sykmeldinger={sykmeldinger}
                                naermesteLedere={naermesteLedere}
                                oppfolgingsdialoger={oppfolgingsdialoger}
                                avbrytHref="/sykefravaer/oppfolgingsplaner"
                                velgArbeidsgiver={this.opprett}
                            />
                        </div>);
                })()
            }
        </Side>);
    }
}

OpprettOppfolgingsdialogSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    oppretter: PropTypes.bool,
    opprettet: PropTypes.bool,
    opprettetId: PropTypes.number,
    opprettingFeilet: PropTypes.bool,
    opprettOppfolgingsdialog: PropTypes.func,
    oppfolgingsdialoger: PropTypes.array,
    hentOppfolgingsdialoger: PropTypes.func,
    oppfolgingsdialogerHentet: PropTypes.bool,
    sykmeldinger: PropTypes.array,
    sykmeldingerHentet: PropTypes.bool,
    hentDineSykmeldinger: PropTypes.func,
    naermesteLedere: PropTypes.array,
    ledereHentet: PropTypes.bool,
    hentLedere: PropTypes.func,
    tilgang: PropTypes.object,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
};

export const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
        sykmeldinger: state.dineSykmeldinger.data,
        naermesteLedere: state.ledere.data,
        henter: state.ledetekster.henter || state.dineSykmeldinger.henter || state.ledere.henter || state.oppfolgingsdialoger.henter || state.tilgang.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.dineSykmeldinger.hentingFeilet || state.ledere.hentingFeilet || state.oppfolgingsdialoger.hentingFeilet || state.tilgang.hentingFeilet,
        oppretter: state.oppfolgingsdialoger.oppretter,
        opprettet: state.oppfolgingsdialoger.opprettet,
        opprettingFeilet: state.oppfolgingsdialoger.opprettingFeilet,
        sykmeldingerHentet: state.dineSykmeldinger.hentet,
        ledereHentet: state.ledere.hentet,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        tilgang: state.tilgang.data,
        tilgangSjekket: state.tilgang.hentet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
        }],
        opprettetId: state.oppfolgingsdialoger.opprettetId,
    };
};

const OppfolgingsdialogContainer = connect(mapStateToProps, { opprettOppfolgingsdialog, hentOppfolgingsdialoger, hentDineSykmeldinger, hentLedere, sjekkTilgang })(OpprettOppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
