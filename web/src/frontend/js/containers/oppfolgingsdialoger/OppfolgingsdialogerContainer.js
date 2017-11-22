import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
    opprettOppfolgingsdialogAt as opprettOppfolgingsdialog,
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    sjekkTilgang,
    hentVirksomhet,
    hentPerson,
    hentNaermesteLeder,
    hentForrigeNaermesteLeder,
    proptypes as oppfolgingProptypes,
    bekreftNyNaermesteLeder,
    henterEllerHarHentetTilgang,
    henterEllerHarHentetOppfolgingsdialoger,
    oppfolgingsdialogHarBlittOpprettet,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import Side from '../../sider/Side';
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
    lederHarBlittAvkreftet,
} from '../../utils/reducerUtils';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { avkreftLeder, hentLedere } from '../../actions/ledere_actions';
import Oppfolgingsdialoger from '../../components/oppfolgingsdialoger/Oppfolgingsdialoger';

export class OppfolgingsdialogerSide extends Component {
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
        const { oppfolgingsdialogerReducer, ledereReducer } = this.props;
        if (lederHarBlittAvkreftet(ledereReducer, nextProps.ledereReducer)) {
            this.props.hentLedere();
            this.props.hentOppfolgingsdialoger();
        }
        if (oppfolgingsdialogHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
            history.push(`/sykefravaer/oppfolgingsplaner/${nextProps.oppfolgingsdialogerReducer.opprettetId}`);
            this.props.hentOppfolgingsdialoger();
        }
    }

    render() {
        const { brodsmuler, ledetekster, henter, hentingFeilet, tilgang, hentet, sender, sendingFeilet } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel', ledetekster)} brodsmuler={brodsmuler} laster={henter || sender || !hentet}>
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
                    return (<Oppfolgingsdialoger {...this.props} />);
                })()
            }
        </Side>);
    }
}

OppfolgingsdialogerSide.propTypes = {
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    hentOppfolgingsdialoger: PropTypes.func,
    ledetekster: keyValue,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    tilgang: oppfolgingProptypes.tilgangPt,
    ledereReducer: ledereReducerPt,
    sykmeldingerReducer: dinesykmeldingerReducerPt,
    oppfolgingsdialogerReducer: oppfolgingProptypes.oppfolgingsdialogerAtPt,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
    tilgangReducer: oppfolgingProptypes.tilgangReducerPt,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    bekreftNyNaermesteLeder: PropTypes.func,
    avkreftLeder: PropTypes.func,
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    hentDineSykmeldinger: PropTypes.func,
    naermesteLedere: PropTypes.arrayOf(naermesteLederPt),
    hentLedere: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
        henter: state.ledetekster.henter
        || state.oppfolgingsdialoger.henter
        || state.tilgang.henter
        || state.dineSykmeldinger.henter
        || state.ledere.henter,
        hentingFeilet: state.ledetekster.hentingFeilet
        || state.oppfolgingsdialoger.hentingFeilet
        || state.tilgang.hentingFeilet
        || state.dineSykmeldinger.hentingFeilet
        || state.ledere.hentingFeilet,
        hentet: state.tilgang.hentet
        && state.oppfolgingsdialoger.hentet
        && state.dineSykmeldinger.hentet
        && state.ledere.hentet,
        sender: state.oppfolgingsdialoger.oppretter
        || state.ledere.avkrefter,
        sendingFeilet: state.oppfolgingsdialoger.hentingFeilet
        || state.ledere.avkreftFeilet,
        sykmeldinger: state.dineSykmeldinger.data,
        naermesteLedere: state.ledere.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        ledereReducer: state.ledere,
        avkrefterLederReducer: state.ledere,
        sykmeldingerReducer: state.dineSykmeldinger,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        tilgangReducer: state.tilgang,
        tilgang: state.tilgang.data,
        bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
        virksomhet: state.virksomhet,
        person: state.person,
        forrigenaermesteleder: state.forrigenaermesteleder,
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

const OppfolgingsdialogerContainer = connect(mapStateToProps, {
    hentOppfolgingsdialoger,
    sjekkTilgang,
    bekreftNyNaermesteLeder,
    avkreftLeder,
    hentDineSykmeldinger,
    hentLedere,
    hentVirksomhet,
    hentPerson,
    hentForrigeNaermesteLeder,
    hentNaermesteLeder,
    opprettOppfolgingsdialog,
})(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
