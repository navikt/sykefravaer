import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import { getContextRoot } from '../routers/paths';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../propTypes';
import Oppfolgingsdialoger from '../components/oppfolgingsdialoger/Oppfolgingsdialoger';
import {
    OppfolgingsdialogInfoboks,
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    sjekkTilgang,
} from 'oppfolgingsdialog-npm';

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

    render() {
        const { brodsmuler, oppfolgingsdialoger, ledetekster, henter, hentingFeilet, tilgang } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialoger.sidetittel', ledetekster)} brodsmuler={brodsmuler}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    } else if (!tilgang.harTilgang) {
                        return (<OppfolgingsdialogInfoboks
                            svgUrl={`${getContextRoot()}/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg`}
                            svgAlt="ikkeTilgang"
                            tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                            tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                        />);
                    }
                    return (<Oppfolgingsdialoger
                        oppfolgingsdialoger={oppfolgingsdialoger}
                        ledetekster={ledetekster}
                    />);
                })()
            }
        </Side>);
    }
}

OppfolgingsdialogerSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    oppfolgingsdialoger: PropTypes.array,
    hentOppfolgingsdialoger: PropTypes.func,
    oppfolgingsdialogerHentet: PropTypes.bool,
    ledetekster: PropTypes.object,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    tilgang: PropTypes.object,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
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
    };
};

const OppfolgingsdialogerContainer = connect(mapStateToProps, { hentOppfolgingsdialoger, sjekkTilgang })(OppfolgingsdialogerSide);

export default OppfolgingsdialogerContainer;
