import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import DineSykmeldingerContainer from '../sykmeldinger/sider/sykmeldinger-side/SykmeldingerSide';
import LandingssideSide from '../landingsside/sider/LandingssideSide';
import DinSykmeldingContainer from '../sykmeldinger/sider/sykmelding-side/SykmeldingSide';
import SykmeldingSkrivUtSide from '../sykmeldinger/sider/SykmeldingSkrivUtSide';
import TidslinjeSide from '../sider/TidslinjeSide';
import KoronaSide from '../sider/KoronaSide';
import SykmeldingKvitteringContainer from '../sykmeldinger/sider/kvittering-side/SykmeldingkvitteringSide';
import AktivitetskravvarselSide from '../aktivitetskrav/sider/AktivitetskravvarselSide';
import InfoSideFO from '../arbeidsrettet-oppfolging/ArbeidsrettetOppfolgingSide';
import Redirectside from '../sider/Redirectside';

const AppRouter = ({ history }) => {
    return (
        <Router history={history}>
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}`} component={LandingssideSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/egensykmelding`} component={KoronaSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/tidslinjen`} component={TidslinjeSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/tidslinjen/:arbeidssituasjon`} component={TidslinjeSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`} component={DineSykmeldingerContainer} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId`} component={DinSykmeldingContainer} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId/skriv-ut`} component={SykmeldingSkrivUtSide} />
            <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId/kvittering`} component={SykmeldingKvitteringContainer} />
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
