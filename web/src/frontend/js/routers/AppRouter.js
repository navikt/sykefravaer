import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import DineSykmeldingerContainer from '../containers/DineSykmeldingerContainer.js';
import LandingssideContainer from '../containers/LandingssideContainer.js';
import { DinSykmeldingContainer } from '../containers/DinSykmeldingContainer.js';
import TidslinjeContainer from '../containers/TidslinjeContainer.js';
import FeilContainer from '../containers/FeilContainer.js';
import { SendTilArbeidsgiverContainer } from '../containers/SendTilArbeidsgiverContainer.js';
import RollerContainer from '../containers/RollerContainer.js';

const Feil = () => {
    return <p>Gå til /app</p>;
};

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={Feil} />
        <Route path="/sykefravaer/app" component={LandingssideContainer} />
        <Route path="/sykefravaer/app/tidslinjen" component={TidslinjeContainer} />
        <Route path="/sykefravaer/app/tidslinjen/:arbeidssituasjon" component={TidslinjeContainer} />
        <Route path="/sykefravaer/app/sykmeldinger" component={DineSykmeldingerContainer} />
        <Route path="/sykefravaer/app/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer} />
        <Route path="/sykefravaer/app/sykmeldinger/:sykmeldingId/send" component={SendTilArbeidsgiverContainer} />
        <Route path="/sykefravaer/app/roller-og-ansvarsomrader" component={RollerContainer} />
        <Route path="*" component={FeilContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
