import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import DineSykmeldingerContainer from '../containers/DineSykmeldingerContainer.js';
import LandingssideContainer from '../containers/LandingssideContainer.js';
import { DinSykmeldingContainer } from '../containers/DinSykmeldingContainer.js';
import TidslinjeContainer from '../containers/TidslinjeContainer.js';
import { SendTilArbeidsgiverContainer } from '../containers/SendTilArbeidsgiverContainer.js';
import RollerContainer from '../containers/RollerContainer.js';
import SendSykmeldingKvitteringContainer from '../containers/SendSykmeldingKvitteringContainer.js';


const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/sykefravaer" component={LandingssideContainer} />
        <Route path="/sykefravaer/tidslinjen" component={TidslinjeContainer} />
        <Route path="/sykefravaer/tidslinjen/:arbeidssituasjon" component={TidslinjeContainer} />
        <Route path="/sykefravaer/sykmeldinger" component={DineSykmeldingerContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId" component={DinSykmeldingContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/send" component={SendTilArbeidsgiverContainer} />
        <Route path="/sykefravaer/roller-og-ansvarsomrader" component={RollerContainer} />
        <Route path="/sykefravaer/sykmeldinger/:sykmeldingId/send/kvittering"
               component={SendSykmeldingKvitteringContainer}/>
        <Route path="*" component={LandingssideContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
