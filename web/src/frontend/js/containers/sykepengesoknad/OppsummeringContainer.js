import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, sykepengesoknadstatuser } from 'digisyfo-npm';
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

const brukersSvarPaForskuttering = (arbeidsgiverForskutterer) => {
    return arbeidsgiverForskutterer === 'JA' || arbeidsgiverForskutterer === 'VET_IKKE';
};

const AGSvarPaForskuttering = (ledere, arbeidsgiverOrgnummer) => {
    return ledere
        .filter((leder) => { return leder.orgnummer === arbeidsgiverOrgnummer; })
        .map((leder) => { return leder.arbeidsgiverForskuttererLoenn; })[0];
};

const harAGSvartPaForskuttering = (ledere, arbeidsgiverOrgnummer) => {
    const ledersSvar = AGSvarPaForskuttering(ledere, arbeidsgiverOrgnummer);
    return ledersSvar === true || ledersSvar === false;
};

const getSisteDagIAGPerioden = (arbeidsgiverPeriodeStartdato) => {
    return new Date(new Date().setTime(arbeidsgiverPeriodeStartdato.getTime() + (16 * 86400000)));
};

const erSoknadInnenforAGPerioden = (arbeidsgiverPeriodeStartdato, soknad) => {
    return soknad.tom <= getSisteDagIAGPerioden(arbeidsgiverPeriodeStartdato)
    && soknad.fom >= arbeidsgiverPeriodeStartdato;
};

const forsteDagISoknadForEllerSammeDagSomSisteDagIAGPerioden = (arbeidsgiverPeriodeStartdato, soknad) => {
    return soknad.fom <= getSisteDagIAGPerioden(arbeidsgiverPeriodeStartdato);
};

export const utledForskutteringOgMottaker = (ledere, soknad, arbeidsgiverperiodeberegning) => {
    if (!(ledere && soknad && arbeidsgiverperiodeberegning)) {
        return { skalTil: NAV, visForskutteringssporsmal: true };
    }
    const arbeidsgiverPeriodeStartdato = arbeidsgiverperiodeberegning && new Date(arbeidsgiverperiodeberegning.startdato);

    if (arbeidsgiverPeriodeStartdato && erSoknadInnenforAGPerioden(arbeidsgiverPeriodeStartdato, soknad)) {
        return { skalTil: ARBEIDSGIVER, visForskutteringssporsmal: false };
    }
    if (arbeidsgiverPeriodeStartdato && forsteDagISoknadForEllerSammeDagSomSisteDagIAGPerioden(arbeidsgiverPeriodeStartdato, soknad)) {
        return { skalTil: NAV_OG_ARBEIDSGIVER, visForskutteringssporsmal: false };
    }
    if (harAGSvartPaForskuttering(ledere, soknad.arbeidsgiver.orgnummer)) {
        return AGSvarPaForskuttering(ledere, soknad.arbeidsgiver.orgnummer)
            ? { skalTil: NAV_OG_ARBEIDSGIVER, visForskutteringssporsmal: false }
            : { skalTil: NAV, visForskutteringssporsmal: false };
    }
    return brukersSvarPaForskuttering(soknad.arbeidsgiverForskutterer)
        ? { skalTil: NAV_OG_ARBEIDSGIVER, visForskutteringssporsmal: true }
        : { skalTil: NAV, visForskutteringssporsmal: true };
};

export const mapStateToProps = (state, ownProps) => {
    const forskutteringOgMottaker = utledForskutteringOgMottaker(state.ledere.data, ownProps.skjemasoknad, state.arbeidsgiverperiodeberegning.data);
    return {
        henterArbeidsgiverperiodeberegning: state.arbeidsgiverperiodeberegning.henter === true,
        henterLedere: state.ledere.henter,
        visForskutteringssporsmal: forskutteringOgMottaker.visForskutteringssporsmal,
        sendesTil: forskutteringOgMottaker.skalTil,
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
