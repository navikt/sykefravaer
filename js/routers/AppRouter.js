import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import LandingssideSide from '../landingsside/sider/LandingssideSide';
import TidslinjeSide from '../sider/TidslinjeSide';
import AktivitetskravvarselSide from '../aktivitetskrav/sider/AktivitetskravvarselSide';
import InfoSideFO from '../arbeidsrettet-oppfolging/ArbeidsrettetOppfolgingSide';
import Redirectside from '../sider/Redirectside';
import EgenmeldingPlaceholder from '../sider/EgenmeldingPlaceholder';
import RedirectTilNySykmeldingApp from '../sykmeldinger/sider/sykmeldinger-side/RedirectTilNySykmeldingApp';

// 01.06.20 - Egensykmeldingsside er erstattet med en infoboks om at tjenesten er avviklet. Koden for egenmeldingsløsningen er ikke fjernet.

const AppRouter = ({ history }) => {
    return (
        <Router history={history}>
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}`} component={LandingssideSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/egensykmelding`} component={EgenmeldingPlaceholder} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/tidslinjen`} component={TidslinjeSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/tidslinjen/:arbeidssituasjon`} component={TidslinjeSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`} component={RedirectTilNySykmeldingApp} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId`} component={RedirectTilNySykmeldingApp} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId/skriv-ut`} component={RedirectTilNySykmeldingApp} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId/kvittering`} component={RedirectTilNySykmeldingApp} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/aktivitetsplikt`} component={AktivitetskravvarselSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/arbeidsrettet-oppfolging`} component={InfoSideFO} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykepengesoknad-utland`} component={Redirectside} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:soknadId`} component={Redirectside} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader`} component={Redirectside} />
            <Route path="*" component={LandingssideSide} />
        </Router>
    );
};

AppRouter.propTypes = {
    history: PropTypes.shape({
        replace: PropTypes.func,
        push: PropTypes.func,
    }),
};

export default AppRouter;
