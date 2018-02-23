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
    populerDialogFraState,
} from 'oppfolgingsdialog-npm';
import Side from '../../sider/Side';
import Sidetopp from '../../components/Sidetopp';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';
import history from '../../history';
import {
    brodsmule as brodsmulePt,
    dinesykmeldingerReducerPt,
    ledereReducerPt,
} from '../../propTypes';
import {
    henterEllerHarHentetLedere,
    henterEllerHarHentetSykmeldinger,
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
        const { tilgang, dinesykmeldinger, naermesteLedere, oppfolgingsdialogerReducer } = this.props;
        if (!henterEllerHarHentetTilgang(tilgang)) {
            this.props.sjekkTilgang();
        }
        if (!henterEllerHarHentetSykmeldinger(dinesykmeldinger)) {
            this.props.hentDineSykmeldinger();
        }
        if (!henterEllerHarHentetLedere(naermesteLedere)) {
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
            window.location.hash = 'arbeidsoppgaver';
            window.sessionStorage.setItem('hash', 'arbeidsoppgaver');
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
        const {
            brodsmuler,
            dinesykmeldinger,
            naermesteLedere,
            oppfolgingsdialoger,
            henter,
            hentingFeilet,
            hentet,
            sender,
            sendingFeilet,
            tilgang,
        } = this.props;
        return (<Side
            tittel={getLedetekst('oppfolgingsdialoger.opprett.tittel')}
            brodsmuler={brodsmuler}
            laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}>
            {
                (() => {
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
                        <div>
                            <Sidetopp
                                tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
                            <OpprettOppfolgingsdialog
                                dinesykmeldinger={dinesykmeldinger}
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
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    naermesteLedere: ledereReducerPt,
    oppfolgingsdialogerReducer: oppfolgingProptypes.oppfolgingsdialogerAtPt,
    dinesykmeldinger: dinesykmeldingerReducerPt,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    tilgang: oppfolgingProptypes.tilgangReducerPt,
    hentDineSykmeldinger: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    hentLedere: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
    sjekkTilgang: PropTypes.func,
};

export const mapStateToProps = (state) => {
    const oppfolgingsdialoger = state.oppfolgingsdialoger.data
        .map((oppfolgingsdialog) => {
            return populerDialogFraState(oppfolgingsdialog, state);
        });
    return {
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
        hentet: state.tilgang.hentet
        || state.dineSykmeldinger.hentet
        || state.ledere.hentet
        || state.oppfolgingsdialoger.hentet
        || state.oppfolgingsdialoger.opprettet,
        sender: state.oppfolgingsdialoger.opprettet,
        sendingFeilet: state.oppfolgingsdialoger.opprettingFeilet,
        naermesteLedere: state.ledere,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        dinesykmeldinger: state.dineSykmeldinger,
        tilgang: state.tilgang,
        ledetekster: state.ledetekster.data,
        oppfolgingsdialoger,
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
