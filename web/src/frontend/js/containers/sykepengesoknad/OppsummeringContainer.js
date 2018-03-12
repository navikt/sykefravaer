/* eslint arrow-body-style: 0, no-nested-ternary: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, sykepengesoknadstatuser, forskutterersvar } from 'digisyfo-npm';
import OppsummeringSkjema from '../../components/sykepengesoknad/Oppsummering/OppsummeringSkjema';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import StartIgjen from '../../components/sykepengesoknad/StartIgjen';
import Kvittering from '../../components/sykepengesoknad/Kvittering';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import mapSkjemasoknadToBackendsoknad from '../../components/sykepengesoknad/mappers/mapSkjemasoknadToBackendsoknad';
import { hentArbeidsgiverperiodeberegning } from '../../actions/arbeidsgiverperiodeberegning_actions';
import { hentLedere } from '../../actions/ledere_actions';
import AppSpinner from '../../components/AppSpinner';
import mapSkjemasoknadToOppsummeringsoknad from '../../components/sykepengesoknad/mappers/mapSkjemasoknadToOppsummeringsoknad';

export const NAV_OG_ARBEIDSGIVER = 'NAV_OG_ARBEIDSGIVER';
export const NAV = 'NAV';
export const ARBEIDSGIVER = 'ARBEIDSGIVER';

const beforeunload = 'beforeunload';

const { SENDT, TIL_SENDING, NY, UTKAST_TIL_KORRIGERING } = sykepengesoknadstatuser;

const onBeforeUnload = (e) => {
    (e || window.event).returnValue = getLedetekst('sykepengesoknad.navigeringsvarsel');
    return getLedetekst('sykepengesoknad.navigeringsvarsel');
};

export class Oppsummering extends Component {
    componentWillMount() {
        const { backendsoknad, router, route } = this.props;
        this.props.hentArbeidsgiverperiodeberegning(backendsoknad);
        this.props.hentLedere();
        router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
        window.addEventListener(beforeunload, onBeforeUnload);
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        window.removeEventListener(beforeunload, onBeforeUnload);
        this._mounted = false;
    }

    routerWillLeave(nextLocation) {
        const { pathname } = nextLocation;
        const { sykepengesoknad } = this.props;
        if ([NY, UTKAST_TIL_KORRIGERING].indexOf(sykepengesoknad.status) === -1 || !this._mounted || pathname.indexOf(sykepengesoknad.id) > -1) {
            return null;
        }
        return getLedetekst('sykepengesoknad.navigeringsvarsel');
    }

    render() {
        if (this.props.henterArbeidsgiverperiodeberegning || this.props.henterLedere) {
            return <AppSpinner />;
        }
        return <OppsummeringSkjema {...this.props} />;
    }
}

Oppsummering.propTypes = {
    hentArbeidsgiverperiodeberegning: PropTypes.func,
    hentLedere: PropTypes.func,
    backendsoknad: sykepengesoknadPt,
    henterArbeidsgiverperiodeberegning: PropTypes.bool,
    henterLedere: PropTypes.bool,
    sendesTil: PropTypes.string,
    router: PropTypes.shape(),
    route: PropTypes.shape(),
    sykepengesoknad: sykepengesoknadPt,
};

const brukersSvarPaForskuttering = arbeidsgiverForskutterer =>
    arbeidsgiverForskutterer === forskutterersvar.JA || arbeidsgiverForskutterer === forskutterersvar.VET_IKKE;

const AGsSvarPaForskuttering = (ledere, arbeidsgiverOrgnummer) => {
    return ledere
        .filter(leder => leder.orgnummer === arbeidsgiverOrgnummer)
        .map(leder => leder.arbeidsgiverForskuttererLoenn)[0];
};

const harAGSvartPaForskuttering = (ledere, arbeidsgiverOrgnummer) => {
    const ledersSvar = AGsSvarPaForskuttering(ledere, arbeidsgiverOrgnummer);
    return ledersSvar === true || ledersSvar === false;
};

const SEKSTEN_DAGER = (16 * 86400000);
const getSisteDagIAGPerioden = arbeidsgiverPeriodeStartdato =>
    new Date(new Date().setTime(arbeidsgiverPeriodeStartdato.getTime() + SEKSTEN_DAGER));

const erSoknadInnenforAGPerioden = (arbeidsgiverPeriodeStartdato, soknadFom, soknadTom) =>
    soknadTom <= getSisteDagIAGPerioden(arbeidsgiverPeriodeStartdato)
    && soknadFom >= arbeidsgiverPeriodeStartdato;

const forsteDagISoknadForEllerSammeDagSomSisteDagIAGPerioden = (arbeidsgiverPeriodeStartdato, soknadFom) =>
    soknadFom <= getSisteDagIAGPerioden(arbeidsgiverPeriodeStartdato);

export const utledMottaker = (ledere, soknad, startdato) =>
    (erSoknadInnenforAGPerioden(startdato, soknad.fom, soknad.tom)
        ? ARBEIDSGIVER
        : ledere
            && (forsteDagISoknadForEllerSammeDagSomSisteDagIAGPerioden(startdato, soknad.fom)
            || AGsSvarPaForskuttering(ledere, soknad.arbeidsgiver.orgnummer)
            || brukersSvarPaForskuttering(soknad.arbeidsgiverForskutterer))
            ? NAV_OG_ARBEIDSGIVER
            : NAV);

export const skalViseForskutteringssporsmal = (ledere, soknad, startdato) =>
    !ledere
    || (!erSoknadInnenforAGPerioden(startdato, soknad.fom, soknad.tom)
    && !forsteDagISoknadForEllerSammeDagSomSisteDagIAGPerioden(startdato, soknad.fom)
    && !harAGSvartPaForskuttering(ledere, soknad.arbeidsgiver.orgnummer));

export const mapStateToProps = (state, ownProps) => {
    const arbeidsgiverperiodeStartdato = state.arbeidsgiverperiodeberegning.data && state.arbeidsgiverperiodeberegning.data.startdato;
    return {
        henterArbeidsgiverperiodeberegning: state.arbeidsgiverperiodeberegning.henter === true,
        henterLedere: state.ledere.henter,
        visForskutteringssporsmal: skalViseForskutteringssporsmal(state.ledere.data, ownProps.skjemasoknad, new Date(arbeidsgiverperiodeStartdato)),
        sendesTil: utledMottaker(state.ledere.data, ownProps.skjemasoknad, new Date(arbeidsgiverperiodeStartdato)),
        backendsoknad: mapSkjemasoknadToBackendsoknad(ownProps.skjemasoknad),
        oppsummeringsoknad: mapSkjemasoknadToOppsummeringsoknad(ownProps.skjemasoknad, ownProps.sykepengesoknad),
    };
};

export const ConnectedOppsummering = connect(mapStateToProps, {
    hentArbeidsgiverperiodeberegning,
    hentLedere,
})(Oppsummering);

export const Controller = (props) => {
    if (props.sykepengesoknad.status === SENDT || props.sykepengesoknad.status === TIL_SENDING) {
        return <Kvittering sykepengesoknad={props.sykepengesoknad} />;
    }
    if (props.skjemasoknad) {
        return <ConnectedOppsummering {...props} />;
    }
    return <StartIgjen sykepengesoknad={props.sykepengesoknad} />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.shape(),
};

const OppsummeringContainer = (props) => {
    const { params, router, route } = props;
    const brodsmuler = [{
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknader om sykepenger',
        sti: '/soknader/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknad',
    }];
    return (<GenerellSoknadContainer
        Component={Controller}
        router={router}
        route={route}
        brodsmuler={brodsmuler}
        params={params} />);
};

OppsummeringContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
    router: PropTypes.shape(),
    route: PropTypes.shape(),
};

export default OppsummeringContainer;
