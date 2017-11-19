import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    sjekkTilgang,
    hentVirksomhet,
    hentPerson,
    hentNaermesteLeder,
    hentForrigeNaermesteLeder,
    proptypes as oppfolgingProptypes,
    bekreftNyNaermesteLeder,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import Side from '../../sider/Side';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';
import {
    brodsmule as brodsmulePt,
    sykmelding as sykmeldingPt,
    naermesteLeder as naermesteLederPt,
} from '../../propTypes';
import { hentDineSykmeldinger } from '../../actions/dineSykmeldinger_actions';
import { avkreftLeder, hentLedere } from '../../actions/ledere_actions';
import Oppfolgingsdialoger from '../../components/oppfolgingsdialoger/Oppfolgingsdialoger';

export class OppfolgingsdialogerSide extends Component {
    componentWillMount() {
        const { oppfolgingsdialogerHentet, tilgangSjekket } = this.props;
        if (!tilgangSjekket) {
            this.props.sjekkTilgang();
        }
        if (!oppfolgingsdialogerHentet) {
            this.props.hentOppfolgingsdialoger();
        }
        if (!this.props.sykmeldingerHentet) {
            this.props.hentDineSykmeldinger();
        }
        if (!this.props.ledereHentet) {
            this.props.hentLedere();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.avkrefterLeder && nextProps.avkreftetLeder) {
            this.props.hentLedere();
            this.props.hentOppfolgingsdialoger();
        }
    }

    render() {
        const { brodsmuler, ledetekster, henter, hentingFeilet, tilgang, avkrefterLeder, avkrefterLederFeilet } = this.props;
        return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter || avkrefterLeder) {
                        return <AppSpinner />;
                    } else if (hentingFeilet || avkrefterLederFeilet) {
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
    oppfolgingsdialogerHentet: PropTypes.bool,
    ledetekster: keyValue,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    tilgang: oppfolgingProptypes.tilgangPt,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
    hentet: PropTypes.bool,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    bekreftNyNaermesteLeder: PropTypes.func,
    avkreftLeder: PropTypes.func,
    avkrefterLeder: PropTypes.bool,
    avkreftetLeder: PropTypes.bool,
    avkrefterLederFeilet: PropTypes.bool,
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    sykmeldingerHentet: PropTypes.bool,
    hentDineSykmeldinger: PropTypes.func,
    naermesteLedere: PropTypes.arrayOf(naermesteLederPt),
    ledereHentet: PropTypes.bool,
    hentLedere: PropTypes.func,
    hentVirksomhet: PropTypes.func,
    hentPerson: PropTypes.func,
    hentNaermesteLeder: PropTypes.func,
    naermesteleder: oppfolgingProptypes.naermestelederReducerPt,
    hentForrigeNaermesteLeder: PropTypes.func,
    virksomhet: oppfolgingProptypes.virksomhetReducerPt,
    person: oppfolgingProptypes.personReducerPt,
    forrigenaermesteleder: oppfolgingProptypes.forrigenaermestelederReducerPt,
};

export const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
        sykmeldinger: state.dineSykmeldinger.data,
        naermesteLedere: state.ledere.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        henter: state.ledetekster.henter || state.oppfolgingsdialoger.henter || state.tilgang.henter || state.dineSykmeldinger.henter || state.ledere.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.oppfolgingsdialoger.hentingFeilet || state.tilgang.hentingFeilet || state.dineSykmeldinger.hentingFeilet || state.ledere.hentingFeilet,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsplaner',
        }],
        tilgang: state.tilgang.data,
        tilgangSjekket: state.tilgang.hentet,
        sykmeldingerHentet: state.dineSykmeldinger.hentet,
        ledereHentet: state.ledere.hentet,
        hentet: state.tilgang.hentet === true && state.oppfolgingsdialoger.hentet === true,
        bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
        avkrefterLeder: state.ledere.avkrefter,
        avkreftetLeder: state.ledere.avkreftet,
        avkrefterLederFeilet: state.ledere.avkreftFeilet,
        virksomhet: state.virksomhet,
        person: state.person,
        forrigenaermesteleder: state.forrigenaermesteleder,
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
})(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
