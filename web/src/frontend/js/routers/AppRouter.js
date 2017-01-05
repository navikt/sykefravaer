import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import DineSykmeldingerContainer from '../containers/DineSykmeldingerContainer';
import LandingssideContainer from '../containers/LandingssideContainer';
import { DinSykmeldingContainer } from '../containers/DinSykmeldingContainer';
import SkrivUtSykmeldingContainer from '../containers/SkrivUtSykmeldingContainer';
import TidslinjeContainer from '../containers/TidslinjeContainer';
import SykmeldingKvitteringContainer from '../containers/SykmeldingKvitteringContainer';
import RollerContainer from '../containers/RollerContainer';
import MoteContainer from '../containers/MoteContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={LandingssideContainer} />
        <Route path="/sykefravaer/tidslinjen" component={TidslinjeContainer} />
        <Route path="/sykefravaer/tidslinjen/:arbeidssituasjon" component={TidslinjeContainer} />
        <Route path="/sykefravaer/sykmeldinger" component={DineSykmeldingerContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/skriv-ut" component={SkrivUtSykmeldingContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/kvittering" component={SykmeldingKvitteringContainer} />
        <Route path="/sykefravaer/roller-og-ansvarsomrader" component={RollerContainer} />
        <Route path="/sykefravaer/dialogmote" component={MoteContainer} />
        <Route path="*" component={LandingssideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
