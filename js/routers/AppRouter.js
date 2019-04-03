import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import DineSykmeldingerContainer from '../sykmeldinger/sider/sykmeldinger-side/SykmeldingerSide';
import LandingssideSide from '../landingsside/sider/LandingssideSide';
import DinSykmeldingContainer from '../sykmeldinger/sider/sykmelding-side/SykmeldingSide';
import SykmeldingSkrivUtSide from '../sykmeldinger/sider/SykmeldingSkrivUtSide';
import TidslinjeSide from '../sider/TidslinjeSide';
import SykmeldingKvitteringContainer from '../sykmeldinger/sider/kvittering-side/SykmeldingkvitteringSide';
import DialogmoterContainer from '../sider/DialogmoterSide';
import MotebehovContainer from '../sider/MotebehovSide';
import DialogmoteSide from '../sider/DialogmoteSide';
import SoknaderSide from '../sykepengesoknad-gammel-plattform/sider/SoknaderSide';
import AktivitetskravvarselSide from '../aktivitetskrav/sider/AktivitetskravvarselSide';
import SykepengesoknadContainer from '../sykepengesoknad/sider/SoknadSide';
import SykepengesoknadUtlandContainer from '../sykepengesoknad/soknad-utland/for-du-begynner/FoerDuBegynnerUtlandContainer';
import InfoSideFO from '../arbeidsrettet-oppfolging/ArbeidsrettetOppfolgingSide';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}`} component={LandingssideSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/tidslinjen`} component={TidslinjeSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/tidslinjen/:arbeidssituasjon`} component={TidslinjeSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger`} component={DineSykmeldingerContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId`} component={DinSykmeldingContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId/skriv-ut`} component={SykmeldingSkrivUtSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/:sykmeldingId/kvittering`} component={SykmeldingKvitteringContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader`} component={SoknaderSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId`} component={SykepengesoknadContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId/side/:sidenummer`} component={SykepengesoknadContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId/fravaer-og-friskmelding`} component={SykepengesoknadContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId/aktiviteter-i-sykmeldingsperioden`} component={SykepengesoknadContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId/oppsummering`} component={SykepengesoknadContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/:sykepengesoknadId/kvittering`} component={SykepengesoknadContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/dialogmote`} component={DialogmoteSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/dialogmoter`} component={DialogmoterContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/dialogmoter/behov`} component={MotebehovContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/dialogmoter/mote`} component={DialogmoteSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/aktivitetsplikt`} component={AktivitetskravvarselSide} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/sykepengesoknad-utland`} component={SykepengesoknadUtlandContainer} />
        <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/arbeidsrettet-oppfolging`} component={InfoSideFO} />
        <Route path="*" component={LandingssideSide} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.shape({
        replace: PropTypes.func,
        push: PropTypes.func,
    }),
};

export default AppRouter;
