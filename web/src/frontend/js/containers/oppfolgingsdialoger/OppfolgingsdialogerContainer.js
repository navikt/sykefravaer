import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    sjekkTilgang,
    proptypes as oppfolgingProptypes,
    bekreftNyNaermesteLeder,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import Side from '../../sider/Side';
import Feilmelding from '../../components/Feilmelding';
import AppSpinner from '../../components/AppSpinner';
import {
    brodsmule as brodsmulePt,
} from '../../propTypes';
import { avkreftLeder } from '../../actions/ledere_actions';
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
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.avkrefterLeder && nextProps.avkreftetLeder) {
            this.props.hentOppfolgingsdialoger();
        }
    }

    render() {
        const { brodsmuler, ledetekster, henter, hentingFeilet, tilgang, hentet, avkrefterLeder, avkrefterLederFeilet } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel', ledetekster)} brodsmuler={brodsmuler} laster={henter || !hentet}>
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
};

export const mapStateToProps = (state) => {
    return {
        ledetekster: state.ledetekster.data,
        oppfolgingsdialoger: state.oppfolgingsdialoger.data,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.hentet,
        henter: state.ledetekster.henter || state.oppfolgingsdialoger.henter || state.tilgang.henter,
        hentingFeilet: state.ledetekster.hentingFeilet || state.oppfolgingsdialoger.hentingFeilet || state.tilgang.hentingFeilet,
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
        hentet: state.tilgang.hentet === true && state.oppfolgingsdialoger.hentet === true,
        bekreftetNyNaermesteLeder: state.nyNaermesteLeder.bekreftet,
        avkrefterLeder: state.ledere.avkrefter,
        avkreftetLeder: state.ledere.avkreftet,
        avkrefterLederFeilet: state.ledere.avkreftFeilet,
    };
};

const OppfolgingsdialogerContainer = connect(mapStateToProps, {
    hentOppfolgingsdialoger,
    sjekkTilgang,
    bekreftNyNaermesteLeder,
    avkreftLeder,
})(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
