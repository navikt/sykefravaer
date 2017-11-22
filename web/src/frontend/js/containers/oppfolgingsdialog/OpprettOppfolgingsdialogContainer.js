import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
    opprettOppfolgingsdialogAt as opprettOppfolgingsdialog,
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    sjekkTilgang,
    proptypes as oppfolgingProptypes,
    henterEllerHarHentetTilgang,
    henterEllerHarHentetOppfolgingsdialoger,
    oppfolgingsdialogHarBlittOpprettet,
} from 'oppfolgingsdialog-npm';
import Side from '../../sider/Side';
import Sidetopp from '../../components/Sidetopp';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';
import history from '../../history';
import {
    brodsmule as brodsmulePt,
    sykmelding as sykmeldingPt,
    naermesteLeder as naermesteLederPt,
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import {
    henterEllerHarHentetLedere,
    henterEllerHarHentetSykmeldinger,
    hentetEllerHentingFeilet,
} from '../../utils/reducerUtils';
import OpprettOppfolgingsdialog from '../../components/oppfolgingsdialoger/OpprettOppfolgingsdialog';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { hentLedere } from '../../actions/ledere_actions';
import { getContextRoot } from '../../routers/paths';

export class OpprettOppfolgingsdialogSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arbeidsgiver: '',
        };
        this.opprett = this.opprett.bind(this);
    }

    componentWillMount() {
        const { tilgangReducer, sykmeldingerReducer, ledereReducer, oppfolgingsdialogerReducer } = this.props;
        if (!henterEllerHarHentetTilgang(tilgangReducer)) {
            this.props.sjekkTilgang();
        }
        if (!henterEllerHarHentetSykmeldinger(sykmeldingerReducer)) {
            this.props.hentDineSykmeldinger();
        }
        if (!henterEllerHarHentetLedere(ledereReducer)) {
            this.props.hentLedere();
        }
        if (!henterEllerHarHentetOppfolgingsdialoger(oppfolgingsdialogerReducer)) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { oppfolgingsdialogerReducer } = this.props;
        if (oppfolgingsdialogHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
            history.push(`/sykefravaer/oppfolgingsplaner/${nextProps.oppfolgingsdialogerReducer.opprettetId}`);
            this.props.hentOppfolgingsdialoger();
        }
    }

    handleOptionChange(e) {
        this.setState({
            arbeidsgiver: e.target.value,
        });
    }

    opprett(values) {
        this.props.opprettOppfolgingsdialog(values.arbeidsgiver);
    }

    render() {
        const { brodsmuler, sykmeldinger, naermesteLedere, oppfolgingsdialoger, henter, hentingFeilet, sender, sendingFeilet, tilgang, hentet } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')} brodsmuler={brodsmuler} henter={henter || sender || !hentet}>
            {
                (() => {
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
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OpprettOppfolgingsdialog
                                sykmeldinger={sykmeldinger}
                                naermesteLedere={naermesteLedere}
                                oppfolgingsdialoger={oppfolgingsdialoger}
                                avbrytHref={`${getContextRoot()}/oppfolgingsplaner`}
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
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    opprettOppfolgingsdialog: PropTypes.func,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    hentOppfolgingsdialoger: PropTypes.func,
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    hentDineSykmeldinger: PropTypes.func,
    naermesteLedere: PropTypes.arrayOf(naermesteLederPt),
    hentLedere: PropTypes.func,
    tilgang: oppfolgingProptypes.tilgangPt,
    sjekkTilgang: PropTypes.func,
    ledereReducer: ledereReducerPt,
    sykmeldingerReducer: dinesykmeldingerReducerPt,
    oppfolgingsdialogerReducer: oppfolgingProptypes.oppfolgingsdialogerAtPt,
    tilgangReducer: oppfolgingProptypes.tilgangReducerPt,
};

export const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
        sykmeldinger: state.dineSykmeldinger.data,
        naermesteLedere: state.ledere.data,
        tilgang: state.tilgang.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        ledereReducer: state.ledere,
        sykmeldingerReducer: state.dineSykmeldinger,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        tilgangReducer: state.tilgang,
        henter: state.ledetekster.henter
        || state.dineSykmeldinger.henter
        || state.ledere.henter
        || state.oppfolgingsdialoger.henter
        || state.tilgang.henter,
        hentingFeilet: state.ledetekster.hentingFeilet
        || state.dineSykmeldinger.hentingFeilet
        || state.ledere.hentingFeilet
        || state.oppfolgingsdialoger.hentingFeilet
        || state.tilgang.hentingFeilet,
        hentet: hentetEllerHentingFeilet([state.tilgang,
            state.dineSykmeldinger,
            state.ledere,
            state.oppfolgingsdialoger.hentet]),
        sender: state.oppfolgingsdialoger.opprettet,
        sendingFeilet: state.oppfolgingsdialoger.opprettingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
        }],
    };
};

const OppfolgingsdialogContainer = connect(mapStateToProps, {
    opprettOppfolgingsdialog,
    hentOppfolgingsdialoger,
    hentDineSykmeldinger,
    hentLedere,
    sjekkTilgang,
})(OpprettOppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
