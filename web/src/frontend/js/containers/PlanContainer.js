import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';
import {
    hentOppfolgingsdialogerAt as hentOppfolgingsdialoger,
    giSamtykke,
    godkjennDialog,
    sjekkTilgang,
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import Plan from '../components/oppfolgingsdialoger/Plan';
import { fraInputdatoTilJSDato } from '../utils';

export class PlanSide extends Component {

    constructor(props) {
        super(props);
        this.giSamtykkeSvar = this.giSamtykkeSvar.bind(this);
        this.godkjennPlan = this.godkjennPlan.bind(this);
    }

    componentWillMount() {
        const { oppfolgingsdialogerHentet, tilgangSjekket } = this.props;
        if (!tilgangSjekket) {
            this.props.sjekkTilgang();
        }
        if (!oppfolgingsdialogerHentet) {
            this.props.hentOppfolgingsdialoger();
        }
    }
    giSamtykkeSvar(values) {
        if (values.samtykkeGitt === 'true') {
            this.props.giSamtykke(this.props.oppfolgingsdialogId);
        }
        this.godkjennPlan(values);
    }

    godkjennPlan(values) {
        const gyldighetstidspunkt = {
            fom: new Date(fraInputdatoTilJSDato(values.startdato)),
            tom: new Date(fraInputdatoTilJSDato(values.sluttdato)),
            evalueres: new Date(fraInputdatoTilJSDato(values.evalueringsdato)),
        };
        this.props.godkjennDialog(this.props.oppfolgingsdialogId, gyldighetstidspunkt, 'true');
    }

    render() {
        const { brodsmuler, ledetekster, oppfolgingsdialog, oppfolgingsdialogId, henter, hentingFeilet, tilgang } = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
            { (() => {
                if (henter) {
                    return <AppSpinner />;
                } else if (hentingFeilet) {
                    return (<Feilmelding />);
                } else if (!tilgang.harTilgang) {
                    return (<OppfolgingsdialogInfoboks
                        svgUrl="/sykefravaer/img/svg/oppfolgingsdialog-infoboks-ikkeTilgang.svg"
                        svgAlt="ikkeTilgang"
                        tittel={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.tittel')}
                        tekst={getLedetekst('oppfolgingsdialog.infoboks.ikke-tilgang.kodebegrensning.tekst')}
                    />);
                }
                return (<Plan
                    ledetekster={ledetekster}
                    oppfolgingsdialog={oppfolgingsdialog}
                    oppfolgingsdialogId={oppfolgingsdialogId}
                    giSamtykkeSvar={this.giSamtykkeSvar}
                />);
            })()
            }
        </Side>);
    }
}

PlanSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    ledetekster: PropTypes.object,
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentOppfolgingsdialoger: PropTypes.func,
    oppfolgingsdialogerHentet: PropTypes.bool,
    tilgang: PropTypes.object,
    tilgangSjekket: PropTypes.bool,
    sjekkTilgang: PropTypes.func,
    giSamtykke: PropTypes.func,
    godkjennDialog: PropTypes.func,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);
    const virksomhetsnavn = oppfolgingsdialog ? oppfolgingsdialog.virksomhetsnavn : '';

    return {
        ledetekster: state.ledetekster.data,
        oppfolgingsdialogerHentet: state.oppfolgingsdialoger.henter,
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet,
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

const PlanContainer = connect(mapStateToProps, { giSamtykke, godkjennDialog, hentOppfolgingsdialoger, sjekkTilgang })(PlanSide);

export default PlanContainer;
