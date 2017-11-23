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
        const { oppfolgingsdialogerReducer, naermesteLedere } = this.props;
        if (lederHarBlittAvkreftet(naermesteLedere, nextProps.naermesteLedere)) {
            this.props.hentLedere();
            this.props.hentOppfolgingsdialoger();
        }
        if (oppfolgingsdialogHarBlittOpprettet(oppfolgingsdialogerReducer, nextProps.oppfolgingsdialogerReducer)) {
            history.push(`/sykefravaer/oppfolgingsplaner/${nextProps.oppfolgingsdialogerReducer.opprettetId}`);
            this.props.hentOppfolgingsdialoger();
        }
    }

    render() {
        const {
            brodsmuler,
            henter,
            hentingFeilet,
            tilgang,
            hentet,
            sender,
            sendingFeilet,
        } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} brodsmuler={brodsmuler} laster={(henter || sender || !hentet) && !(sendingFeilet || hentingFeilet)}>
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
                    return (<Oppfolgingsdialoger {...this.props} />);
                })()
            }
        </Side>);
    }
}

OppfolgingsdialogerSide.propTypes = {
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    dinesykmeldinger: dinesykmeldingerReducerPt,
    naermesteLedere: ledereReducerPt,
    oppfolgingsdialogerReducer: oppfolgingProptypes.oppfolgingsdialogerAtPt,
    person: oppfolgingProptypes.personReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
    tilgang: oppfolgingProptypes.tilgangReducerPt,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    avkreftLeder: PropTypes.func,
    bekreftNyNaermesteLeder: PropTypes.func,
    hentDineSykmeldinger: PropTypes.func,
    hentForrigeNaermesteLeder: PropTypes.func,
    hentLedere: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    hentOppfolgingsdialoger: PropTypes.func,
    hentPerson: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
    sjekkTilgang: PropTypes.func,
};

export const mapStateToProps = (state) => {
    return {
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
        || state.dineSykmeldinger.hentet
        || state.ledere.hentet
        || state.oppfolgingsdialoger.hentet
        || state.ledere.avkreftet
        || state.oppfolgingsdialoger.opprettet,
        sender: state.oppfolgingsdialoger.oppretter
        || state.ledere.avkrefter,
        sendingFeilet: state.oppfolgingsdialoger.hentingFeilet
        || state.ledere.avkreftFeilet,
        avkrefterLederReducer: state.ledere,
        dinesykmeldinger: state.dineSykmeldinger,
        forrigenaermesteleder: state.forrigenaermesteleder,
        naermesteLedere: state.ledere,
        oppfolgingsdialogerReducer: state.oppfolgingsdialoger,
        person: state.person,
        tilgang: state.tilgang,
        virksomhet: state.virksomhet,
        bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
        ledetekster: state.ledetekster.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
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
