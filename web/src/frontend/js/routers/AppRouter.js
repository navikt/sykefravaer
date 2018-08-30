import React from 'react';
import PropTypes from 'prop-types';
import { Route, Router } from 'react-router';
import DineSykmeldingerContainer from '../sider/SykmeldingerSide';
import LandingssideSide from '../sider/LandingssideSide';
import DinSykmeldingContainer from '../sider/SykmeldingSide';
import SykmeldingSkrivUtSide from '../sider/SykmeldingSkrivUtSide';
import TidslinjeSide from '../sider/TidslinjeSide';
import SykmeldingKvitteringContainer from '../sider/SykmeldingkvitteringSide';
import DialogmoteSide from '../sider/DialogmoteSide';
import SoknaderSide from '../sider/SoknaderSide';
import OppfolgingsdialogerSide from '../sider/OppfolgingsdialogerSide';
import OppfolgingsdialogSide from '../sider/OppfolgingsdialogSide';
import AktivitetskravvarselSide from '../sider/AktivitetskravvarselSide';
import SykepengesoknadContainer from '../sider/SoknadSide';
import SykepengesoknadUtlandContainer from '../containers/sykepengesoknad-utland/SykepengesoknadUtlandContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={LandingssideSide} />
        <Route path="/sykefravaer/tidslinjen" component={TidslinjeSide} />
        <Route path="/sykefravaer/tidslinjen/:arbeidssituasjon" component={TidslinjeSide} />
        <Route path="/sykefravaer/sykmeldinger" component={DineSykmeldingerContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/skriv-ut" component={SykmeldingSkrivUtSide} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/kvittering" component={SykmeldingKvitteringContainer} />
        <Route path="/sykefravaer/soknader" component={SoknaderSide} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId" component={SykepengesoknadContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/fravaer-og-friskmelding" component={SykepengesoknadContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/aktiviteter-i-sykmeldingsperioden" component={SykepengesoknadContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/oppsummering" component={SykepengesoknadContainer} />
        <Route path="/sykefravaer/soknader/:sykepengesoknadId/kvittering" component={SykepengesoknadContainer} />
        <Route path="/sykefravaer/dialogmote" component={DialogmoteSide} />
        <Route path="/sykefravaer/oppfolgingsplaner" component={OppfolgingsdialogerSide} />
        <Route path="/sykefravaer/oppfolgingsplaner/:oppfolgingsdialogId" component={OppfolgingsdialogSide} />
        <Route path="/sykefravaer/aktivitetsplikt" component={AktivitetskravvarselSide} />
        <Route path="/sykefravaer/sykepengesoknad-utland" component={SykepengesoknadUtlandContainer} />
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
